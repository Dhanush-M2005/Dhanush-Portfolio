import { useEffect } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Custom hook to animate a number from 0 to a specified value.
 * Handles integers, floats, and suffixes (e.g., "1000+", "8.29").
 * 
 * @param {string|number} value - The target value to animate to (e.g., "1000+", 8.29).
 * @param {boolean} inView - Whether the element is currently in view (to trigger animation).
 * @param {number} duration - Duration of the animation in seconds.
 * @param {number} delay - Delay before starting the animation in seconds.
 * @returns {import("framer-motion").MotionValue} - A MotionValue string ready to be rendered.
 */
const useAnimatedCounter = (value, inView = false, duration = 2, delay = 0) => {
    // 1. Parse the input value
    const stringValue = String(value);

    // Find the first occurrence of a number (integer or float)
    const match = stringValue.match(/(\d+(\.\d+)?)/);

    let prefix = "";
    let suffix = "";
    let numericValue = 0;

    if (match) {
        numericValue = parseFloat(match[0]);
        const index = match.index;
        prefix = stringValue.substring(0, index);
        suffix = stringValue.substring(index + match[0].length);
    } else {
        // Fallback for non-numeric strings (though this hook is meant for numbers)
        numericValue = 0;
        prefix = stringValue;
    }

    // Check if the matched number had decimals to determine formatting
    const isFloat = match ? match[0].includes(".") : false;
    const decimalPlaces = isFloat ? match[0].split(".")[1].length : 0;

    // 2. Create a MotionValue starting at 0
    const count = useMotionValue(0);

    // 3. Transform the raw number into a formatted string
    const rounded = useTransform(count, (latest) => {
        let formattedNumber;
        if (isFloat) {
            formattedNumber = latest.toFixed(decimalPlaces);
        } else {
            formattedNumber = Math.round(latest).toString();
        }
        return prefix + formattedNumber + suffix;
    });

    // 4. Animate when inView becomes true
    useEffect(() => {
        if (inView) {
            const controls = animate(count, numericValue, {
                duration: duration,
                delay: delay,
                ease: "easeOut"
            });

            return controls.stop;
        } else {
            // Reset to 0 when out of view so it animates again next time
            count.set(0);
        }
    }, [inView, numericValue, duration, delay, count]);

    return rounded;
};

export default useAnimatedCounter;
