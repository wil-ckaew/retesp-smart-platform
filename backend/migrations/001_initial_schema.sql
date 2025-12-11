-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
CREATE TYPE seal_material AS ENUM (
    'nitrile',
    'viton',
    'silicone',
    'polyurethane',
    'ptfe',
    'custom'
);

CREATE TYPE seal_status AS ENUM (
    'in_stock',
    'shipped',
    'installed',
    'operating',
    'warning',
    'critical',
    'failed',
    'replaced'
);

CREATE TYPE scan_type AS ENUM (
    'production',
    'quality_check',
    'shipping',
    'receiving',
    'installation',
    'maintenance',
    'inspection',
    'replacement'
);

-- Main seals table
CREATE TABLE smart_seals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    qr_code_hash VARCHAR(64) NOT NULL,
    
    -- Manufacturing
    batch_number VARCHAR(20) NOT NULL,
    production_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    production_line VARCHAR(50),
    operator_id VARCHAR(50),
    
    -- Specifications
    material_type seal_material NOT NULL,
    size_code VARCHAR(20) NOT NULL,
    temperature_rating INTEGER,
    pressure_rating DECIMAL(10,2),
    
    -- Installation
    customer_id UUID,
    vehicle_vin VARCHAR(50),
    installation_date TIMESTAMP WITH TIME ZONE,
    installer_id VARCHAR(50),
    installation_location TEXT,
    
    -- Status
    current_status seal_status DEFAULT 'in_stock',
    health_score DECIMAL(5,2) DEFAULT 100.00,
    last_scanned TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_operating_hours DECIMAL(10,2) DEFAULT 0,
    
    -- Sensor data
    last_temperature DECIMAL(5,2),
    last_vibration DECIMAL(5,2),
    last_pressure DECIMAL(5,2),
    
    -- Analytics
    predicted_failure_date TIMESTAMP WITH TIME ZONE,
    failure_probability_7d DECIMAL(5,4),
    failure_probability_30d DECIMAL(5,4),
    
    -- Warranty
    warranty_end_date TIMESTAMP WITH TIME ZONE,
    warranty_claim_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_seal_serial ON smart_seals (serial_number);
CREATE INDEX idx_seal_batch ON smart_seals (batch_number);
CREATE INDEX idx_seal_customer ON smart_seals (customer_id);
CREATE INDEX idx_seal_status ON smart_seals (current_status);
CREATE INDEX idx_seal_health ON smart_seals (health_score);

-- Scan events history
CREATE TABLE seal_scan_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seal_id UUID NOT NULL REFERENCES smart_seals(id) ON DELETE CASCADE,
    scanner_id VARCHAR(100) NOT NULL,
    location TEXT,
    gps_latitude DECIMAL(10,8),
    gps_longitude DECIMAL(11,8),
    gps_accuracy DECIMAL(5,2),
    scan_type scan_type NOT NULL,
    notes TEXT,
    sensor_data JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_scan_seal ON seal_scan_events (seal_id);
CREATE INDEX idx_scan_date ON seal_scan_events (created_at);
CREATE INDEX idx_scan_type ON seal_scan_events (scan_type);

-- Customers/OEMs
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g., "FIAT", "VW"
    type VARCHAR(20) NOT NULL, -- 'oem', 'distributor', 'workshop'
    country VARCHAR(2),
    contact_email VARCHAR(200),
    contact_phone VARCHAR(50),
    
    -- Subscription plan
    plan_type VARCHAR(20) DEFAULT 'free',
    api_key VARCHAR(100) UNIQUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_customer_code ON customers (code);
CREATE INDEX idx_customer_type ON customers (type);

-- Alerts and notifications
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seal_id UUID REFERENCES smart_seals(id),
    customer_id UUID REFERENCES customers(id),
    
    alert_type VARCHAR(50) NOT NULL, -- 'health_warning', 'maintenance_due', 'recall_risk'
    severity VARCHAR(20) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by VARCHAR(100),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    
    resolved BOOLEAN DEFAULT false,
    resolved_by VARCHAR(100),
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_alert_seal ON alerts (seal_id);
CREATE INDEX idx_alert_customer ON alerts (customer_id);
CREATE INDEX idx_alert_severity ON alerts (severity);
CREATE INDEX idx_alert_status ON alerts (acknowledged, resolved);

-- Analytics cache
CREATE TABLE analytics_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    metric_name VARCHAR(100) NOT NULL,
    period VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
    data JSONB NOT NULL,
    
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_analytics_customer ON analytics_cache (customer_id);
CREATE INDEX idx_analytics_metric ON analytics_cache (metric_name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_smart_seals_updated_at
    BEFORE UPDATE ON smart_seals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data for demonstration
INSERT INTO customers (id, name, code, type, country, plan_type) VALUES
    (uuid_generate_v4(), 'FIAT Automóveis', 'FIAT', 'oem', 'BR', 'premium'),
    (uuid_generate_v4(), 'Volkswagen do Brasil', 'VW', 'oem', 'BR', 'premium'),
    (uuid_generate_v4(), 'Distribuidor Paulista', 'DIST-PAUL', 'distributor', 'BR', 'basic');

-- Insert sample seals
INSERT INTO smart_seals 
    (serial_number, qr_code_hash, batch_number, material_type, size_code, temperature_rating, pressure_rating)
SELECT 
    'RET-' || batch || '-' || LPAD(seq::text, 6, '0'),
    MD5('RET-' || batch || '-' || LPAD(seq::text, 6, '0')),
    batch,
    (ARRAY['nitrile'::seal_material, 'viton'::seal_material, 'silicone'::seal_material])[floor(random() * 3 + 1)],
    (ARRAY['25x40x7', '30x45x8', '35x50x10'])[floor(random() * 3 + 1)],
    120 + floor(random() * 40),
    10 + round((random() * 20)::numeric, 2)
FROM generate_series(1, 100) as seq
CROSS JOIN (VALUES ('BATCH-2024-01'), ('BATCH-2024-02'), ('BATCH-2024-03')) as batches(batch);
