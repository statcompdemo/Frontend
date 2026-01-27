/**
 * Centralized Logger Utility
 * ----------------------------------------
 * - Environment controlled (Vite compatible)
 * - Supports info, debug, warning, error
 * - Timestamped logs
 * - Optional scoped logger support
 */

const isDev = import.meta.env.MODE === 'development';

const LOG_LEVELS = {
  info: import.meta.env.VITE_LOG_INFO === 'true' || isDev,
  debug: import.meta.env.VITE_LOG_DEBUG === 'true' || isDev,
  warning: import.meta.env.VITE_LOG_WARNING === 'true' || isDev,
  error: import.meta.env.VITE_LOG_ERROR === 'true' || isDev,
};

// Log logger configuration only in development
if (isDev) {
  console.debug('[LOGGER CONFIG]', LOG_LEVELS);
}

/**
 * Base log function
 */
export const log = (level, ...messages) => {
  if (!LOG_LEVELS[level]) return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case 'info':
      console.info(prefix, ...messages);
      break;
    case 'debug':
      console.debug(prefix, ...messages);
      break;
    case 'warning':
      console.warn(prefix, ...messages);
      break;
    case 'error':
      console.error(prefix, ...messages);
      break;
    default:
      log('info', prefix, ...messages);
  }
};

/**
 * Scoped logger (recommended for components/modules)
 * Usage:
 *   const logger = createLogger('AssignedWorkTab');
 *   logger.info('Fetching tasks...');
 */
export const createLogger = (scope) => ({
  info: (...m) => log('info', `[${scope}]`, ...m),
  debug: (...m) => log('debug', `[${scope}]`, ...m),
  warn: (...m) => log('warning', `[${scope}]`, ...m),
  warning: (...m) => log('warning', `[${scope}]`, ...m),
  error: (...m) => log('error', `[${scope}]`, ...m),
});
