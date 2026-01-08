// libraries
import { ref, onUnmounted } from 'vue';

/**
 * Composable for managing cooldown timers
 * @param duration - Cooldown duration in seconds (default: 20)
 * @returns Object with cooldown state and control functions
 */
export const useCooldown = (duration: number = 20) => {
  const cooldownSeconds = ref(0);
  let cooldownInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Start the cooldown timer
   */
  const startCooldown = (): void => {
    cooldownSeconds.value = duration;

    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }

    cooldownInterval = setInterval(() => {
      cooldownSeconds.value--;
      if (cooldownSeconds.value <= 0) {
        if (cooldownInterval) {
          clearInterval(cooldownInterval);
          cooldownInterval = null;
        }
      }
    }, 1000);
  };

  /**
   * Reset the cooldown timer
   */
  const resetCooldown = (): void => {
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
      cooldownInterval = null;
    }
    cooldownSeconds.value = 0;
  };

  // Cleanup on unmount
  onUnmounted(() => {
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }
  });

  return {
    cooldownSeconds,
    startCooldown,
    resetCooldown,
  };
};
