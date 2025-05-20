import { track } from "@vercel/analytics";

/**
 * Rust Tools Analytics Helper
 * Use these functions to track specific events in your application
 */

/**
 * Track when a user uses a specific calculator
 */
export const trackCalculatorUsage = (calculatorName: string) => {
  track("calculator_used", { calculatorName });
};

/**
 * Track when a user selects settings or options
 */
export const trackSettingChange = (settingName: string, value: string) => {
  track("setting_changed", { settingName, value });
};

/**
 * Track when users search for something in your app
 */
export const trackSearch = (searchTerm: string) => {
  track("search_performed", { searchTerm });
};

/**
 * Track when user interacts with a specific feature
 */
export const trackFeatureUsage = (featureName: string, action: string) => {
  track("feature_interaction", { featureName, action });
};

/**
 * Track when a user shares content
 */
export const trackShare = (contentType: string, method: string) => {
  track("content_shared", { contentType, method });
};

/**
 * Track errors that users encounter
 */
export const trackError = (errorType: string, message: string) => {
  track("error_occurred", { errorType, message });
};

/**
 * Custom event tracking for anything else
 */
export const trackCustomEvent = (eventName: string, properties: Record<string, any>) => {
  track(eventName, properties);
}; 