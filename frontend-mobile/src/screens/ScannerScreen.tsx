'use strict';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { scanSeal } from '../services/api';
import { colors } from '../utils/constants';

const { width, height } = Dimensions.get('window');
const SCANNER_SIZE = 250;

export default function ScannerScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions ? Camera.useCameraPermissions() : [null, async () => {}];
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [torch, setTorch] = useState(false);
  const navigation = useNavigation();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission?.();
      }
    })();
  }, [permission]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);

    // Animation
    scale.value = withSequence(withSpring(1.2), withSpring(1));
    opacity.value = withSequence(withTiming(0.5, { duration: 200 }), withTiming(1, { duration: 200 }));

    try {
      setLoading(true);

      // Scan the seal (API stub)
      const result = await scanSeal(data, {
        scannerId: 'mobile-app',
        location: 'Field Scan',
        scanType: 'inspection',
      });

      // Navigate to seal details
      // @ts-ignore
      navigation.navigate('SealDetail', {
        sealId: result?.seal_id ?? data,
        scanData: result,
      });

      setTimeout(() => {
        setScanned(false);
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível escanear o retentor. Verifique o código e tente novamente.');
      setScanned(false);
      setLoading(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-off" size={64} color={colors.gray} />
        <Text style={styles.permissionTitle}>Permissão da Câmera Necessária</Text>
        <Text style={styles.permissionText}>
          Precisamos acessar sua câmera para escanear códigos QR dos retentores.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => requestPermission?.()}>
          <Text style={styles.permissionButtonText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        ratio="16:9"
      >
        <BlurView intensity={80} style={StyleSheet.absoluteFill}>
          <View style={styles.topInfo}>
            <View style={styles.infoCard}>
              <Ionicons name="qr-code" size={20} color={colors.white} />
              <Text style={styles.infoText}>Posicione o código QR dentro do quadro</Text>
            </View>
          </View>

          <View style={styles.scannerContainer}>
            <Animated.View style={[styles.scannerFrame, animatedStyle]} />
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <Animated.View style={[styles.scanLine, animatedStyle]} />
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => setTorch(!torch)}>
              <Ionicons name={torch ? 'flash' : 'flash-off'} size={28} color={colors.white} />
              <Text style={styles.controlText}>Lanterna</Text>
            </TouchableOpacity>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.white} />
                <Text style={styles.loadingText}>Processando...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scanner')}>
                <Text style={styles.scanButtonText}>Inserir Manualmente</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.controlButton} onPress={() => navigation.navigate('History')}>
              <Ionicons name="time" size={28} color={colors.white} />
              <Text style={styles.controlText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Camera>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          <Ionicons name="information-circle" size={16} color={colors.blue} /> Escaneie o código QR do retentor RETESP para obter informações detalhadas
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  camera: { flex: 1 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: colors.white },
  permissionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  permissionText: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: colors.gray },
  permissionButton: { backgroundColor: colors.blue, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
  permissionButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  topInfo: { paddingTop: 60, paddingHorizontal: 20 },
  infoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 12, gap: 10 },
  infoText: { color: colors.white, fontSize: 14, fontWeight: '500' },
  scannerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scannerFrame: { width: SCANNER_SIZE, height: SCANNER_SIZE, borderWidth: 2, borderColor: colors.blue, backgroundColor: 'transparent', borderRadius: 12 },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: colors.blue },
  cornerTL: { top: height / 2 - SCANNER_SIZE / 2 - 15, left: width / 2 - SCANNER_SIZE / 2 - 15, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  cornerTR: { top: height / 2 - SCANNER_SIZE / 2 - 15, right: width / 2 - SCANNER_SIZE / 2 - 15, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  cornerBL: { bottom: height / 2 - SCANNER_SIZE / 2 - 15, left: width / 2 - SCANNER_SIZE / 2 - 15, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: height / 2 - SCANNER_SIZE / 2 - 15, right: width / 2 - SCANNER_SIZE / 2 - 15, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  scanLine: { position: 'absolute', width: SCANNER_SIZE - 20, height: 2, backgroundColor: colors.blue },
  bottomControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 },
  controlButton: { alignItems: 'center', padding: 10 },
  controlText: { color: colors.white, fontSize: 12, marginTop: 5 },
  scanButton: { backgroundColor: colors.blue, paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  scanButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  loadingContainer: { alignItems: 'center' },
  loadingText: { color: colors.white, marginTop: 10, fontSize: 14 },
  instructions: { position: 'absolute', bottom: 120, left: 20, right: 20, backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 12 },
  instructionText: { color: colors.dark, fontSize: 14, textAlign: 'center' },
});
