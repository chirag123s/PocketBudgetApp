import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BudgetMateLogo } from './BudgetMateLogo';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const floatingIcons = [
  { icon: 'currency-usd', delay: 0, x: -80, y: -100 },
  { icon: 'bitcoin', delay: 200, x: 80, y: -150 },
  { icon: 'piggy-bank', delay: 400, x: -100, y: 100 },
  { icon: 'credit-card', delay: 600, x: 70, y: 120 },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isGuestMode, hasCompletedOnboarding, isLoading } = useAuth();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useSharedValue(0);
  const mouseY = useSharedValue(0);
  const logoScale = useSharedValue(1);
  const logoRotate = useSharedValue(-180);

  // Initialize animations
  useEffect(() => {
    logoRotate.value = withSpring(0, {
      stiffness: 100,
      damping: 10,
    });
  }, []);

  // Navigation logic
  useEffect(() => {
    // Wait for auth check to complete, then show splash for 10 seconds
    if (!isLoading) {
      const timer = setTimeout(() => {
        // Route based on authentication state
        if (isGuestMode) {
          // Guest mode → Go directly to main app
          router.replace('/tabs');
        } else if (!isAuthenticated) {
          // Not authenticated → Go to welcome screen
          router.replace('/auth/welcome');
        } else if (!hasCompletedOnboarding) {
          // Authenticated but not onboarded → Go to bank connection
          router.replace('/bank/intro');
        } else {
          // Fully set up → Go to main app
          router.replace('/tabs');
        }
      }, 1000000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, isGuestMode, hasCompletedOnboarding]);

  const handleTouch = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const newRipple = {
      id: Date.now(),
      x: locationX,
      y: locationY,
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      mouseX.value = (event.x - SCREEN_WIDTH / 2) / 20;
      mouseY.value = (event.y - SCREEN_HEIGHT / 2) / 20;
    });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: mouseX.value * 0.5 },
        { translateY: mouseY.value * 0.5 },
      ],
    };
  });

  const handlePressIn = () => {
    setIsPressed(true);
    logoScale.value = withSpring(1.1);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    logoScale.value = withSpring(1);
  };

  const logoScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoScale.value },
        { rotate: `${logoRotate.value}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#1E40AF', '#3B82F6', '#60A5FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <FloatingIcon
            key={index}
            icon={item.icon}
            delay={item.delay}
            x={item.x}
            y={item.y}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
        ))}

        {/* Main Content */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTouch}
          style={styles.contentContainer}
        >
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            {/* Logo Circle */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View style={[styles.logoCircle, logoScaleStyle]}>
                <View style={styles.logoCircleInner}>
                  <BudgetMateLogo iconOnly style={styles.logoIcon} />
                </View>

                {/* Pulsing Ring */}
                <PulsingRing />
              </Animated.View>
            </TouchableOpacity>

            {/* App Name */}
            <Animated.View style={styles.textContainer}>
              <Text style={styles.appName}>budgetmate</Text>
              <Text style={styles.tagline}>Your Smart Finance Companion</Text>
            </Animated.View>

            {/* Loading Indicator */}
            <View style={styles.loadingContainer}>
              {[0, 1, 2].map((i) => (
                <LoadingDot key={i} index={i} />
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* Background Pattern */}
        <BackgroundPattern mouseX={mouseX} mouseY={mouseY} />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </View>
    </GestureDetector>
  );
}

// Floating Icon Component
function FloatingIcon({
  icon,
  delay,
  x,
  y,
  mouseX,
  mouseY,
}: {
  icon: string;
  delay: number;
  x: number;
  y: number;
  mouseX: Animated.SharedValue<number>;
  mouseY: Animated.SharedValue<number>;
}) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const translateY = useSharedValue(y);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    scale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });

    translateY.value = withRepeat(
      withSequence(
        withTiming(y, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(y - 20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(y, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: -mouseX.value * 0.3 },
        { translateY: translateY.value - mouseY.value * 0.3 },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.floatingIcon,
        {
          left: SCREEN_WIDTH / 2 + x,
          top: SCREEN_HEIGHT / 2 + y,
        },
        animatedStyle,
      ]}
    >
      <MaterialCommunityIcons name={icon as any} size={48} color="white" />
    </Animated.View>
  );
}

// Ripple Effect Component
function RippleEffect({ x, y }: { x: number; y: number }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withTiming(3, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          left: x - 64,
          top: y - 64,
        },
        animatedStyle,
      ]}
    />
  );
}

// Pulsing Ring Component
function PulsingRing() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.15, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.pulsingRing, animatedStyle]} />;
}

// Loading Dot Component
function LoadingDot({ index }: { index: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.3, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.loadingDot, animatedStyle]} />;
}

// Background Pattern Component
function BackgroundPattern({
  mouseX,
  mouseY,
}: {
  mouseX: Animated.SharedValue<number>;
  mouseY: Animated.SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: mouseX.value * 0.2 },
        { translateY: mouseY.value * 0.2 },
      ],
    };
  });

  return (
    <Animated.View style={[styles.backgroundPattern, animatedStyle]}>
      {/* You can add a pattern using SVG or repeated Views */}
    </Animated.View>
  );
}

// Floating Particle Component
function FloatingParticle({ index }: { index: number }) {
  const translateY = useSharedValue(SCREEN_HEIGHT + 50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const duration = 6000 + Math.random() * 4000;
    const delay = index * 500;

    setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(-50, {
          duration: duration,
          easing: Easing.linear,
        }),
        -1,
        false
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: duration / 6 }),
          withTiming(0.6, { duration: duration / 3 }),
          withTiming(0, { duration: duration / 2 })
        ),
        -1,
        false
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: `${Math.random() * 100}%`,
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    gap: 32,
    zIndex: 10,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  logoCircleInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoIcon: {
    width: 96,
    height: 96,
    zIndex: 10,
  },
  pulsingRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    color: 'white',
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: -1,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  floatingIcon: {
    position: 'absolute',
  },
  ripple: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'white',
    pointerEvents: 'none',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});
