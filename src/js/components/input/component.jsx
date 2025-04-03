import React, {
    Suspense,
    useDeferredValue,
    useEffect,
    useMemo,
    useState
} from 'react';

/**
 * An enumeration representing possible kinds of cursors.
 *
 * @enum {string}
 */
export const CursorEnum = {
    /**
     * No cursor.
     */
    None: 'none',

    /**
     * A vertical bar.
     *
     * The default.
     */
    Bar: 'bar',

    /**
     * A filled box.
     */
    Box: 'box',

    /**
     * An underline.
     */
    Underline: 'underline'
};

/**
 * The properties used to render an {@link Input} component.
 *
 * @typedef InputProps
 *
 * @property {string} [id] The ID to assign to the component.
 * @property {string} [placeholder] A placeholder to show until a value is
 * provided.
 * @property {() => string?} [onValueChanged] A callback that can be provided
 * and will be called when the field value is changed.
 * @property {boolean} [hidden] Whether the input value is hidden.
 * @property {string} [hideCharacter] The character to use to hide the input. If
 * more than one character is provided only the first will be used.
 * @property {number} [hideDelay] The time, in milliseconds, to delay before
 * hiding the input, if input hiding is enabled.
 * @property {CursorEnum} [cursor] The kind of cursor to use. Defaults to
 * {@link CursorEnum.Bar}.
 * @property {boolean} [cursorBlink] Whether the cursor, if enabled, should
 * blink.
 * @property {number} [cursorBlinkTime] The time to take to blink the cursor,
 * in milliseconds. This value is the time taken to complete one full blink
 * cycle. Thus the cursor will be visible for half this time and invisible for
 * the other half.
 */

/**
 * A callback used to set the value.
 *
 * @typedef {(value: string) => void} SetValueCallback
 *
 * @param {string} value The value to set.
 */

/**
 * The input handling routine.
 *
 * @type {(event: KeyboardEvent, currentValue: string, setValueCallback: SetValueCallback) => void}
 *
 * @param {KeyboardEvent} event The event coming in from the DOM.
 * @param {string} [currentValue] The current value.
 * @param {SetValueCallback} [setValueCallback] Set the value read by the
 * input handler.
 */
const inputHandler = (event, currentValue, setValue) => {
    //-- Only handle keys which have a string value
    if (!event.key) {
        return;
    }
    // HACK: Do not handle "special" keys (enter, tab, etc.) except backspace
    if (event.key.length > 1 && event.key !== 'Backspace') {
        return;
    }
    if (setValue) {
        if (event.key === 'Backspace') {
            if (!currentValue) {
                return;
            }
            setValue(currentValue.substring(0, currentValue.length - 1));
        } else {
            setValue((currentValue ?? '') + event.key);
        }
    }
};

/**
 * Compute the display value to show in the input field.
 *
 * TODO: Document parameters.
 */
const computeDisplayValue = (
    value,
    isFocused,
    isHidden,
    hideCharacter = '*',
    placeholder = '',
    hideLast = false
) => {
    return (
        value ?
            isHidden ?
                Array.from(value)
                    .map((v, i, a) => {
                        if (i < a.length - 1 || hideLast) {
                            return hideCharacter;
                        }
                        return v;
                    })
                    .join('')
            :   value
        : isFocused ? ''
        : (placeholder ?? '')
    );
};

/**
 * The application index page component.
 *
 * @type {React.FunctionComponent<InputProps>}
 */
const Input = (props) => {
    const hideCharacter = (props.hideCharacter ?? '')[0] || '*';
    const hidden = props.hidden ?? false;
    const cursorBlink = props.cursorBlink ?? false;
    const cursorBlinkTime = props.cursorBlinkTime ?? 2000;
    const [isFocused, setFocused] = useState(false);
    const [value, setValue] = useState(null);
    const [hideLast, setHideLast] = useState(false);
    const [hideLastTimeout, setHideLastTimeout] = useState(null);
    const [blinkInterval, setBlinkInterval] = useState(null);
    const [cursorVisible, setCursorVisible] = useState(true);
    const classList = ['oregan-input'];
    if (!value && props.placeholder) {
        classList.push('oregan-input-placeholder');
    }
    const cursorProp = props.cursor ?? CursorEnum.Bar;
    let cursor = '';
    if (isFocused) {
        switch (cursorProp) {
            case CursorEnum.None:
                cursor = '';
                break;
            case CursorEnum.Bar:
                cursor = '|';
                break;
            case CursorEnum.Box:
                cursor = '█';
                break;
            case CursorEnum.Underline:
                cursor = '_';
                break;
            default:
                cursor = '|';
                break;
        }
    }
    useEffect(() => {
        if (blinkInterval) {
            clearInterval(blinkInterval);
        }
        if (!isFocused) {
            return;
        }
        if (!cursorBlink) {
            setCursorVisible(true);
            return;
        }
        if (cursorBlinkTime < 2) {
            setCursorVisible(true);
            return;
        }
        setBlinkInterval(
            setInterval(
                () => {
                    setCursorVisible(!cursorVisible);
                },
                Math.max(Math.floor(cursorBlinkTime / 2), 0)
            )
        );
    }, [props.cursorBlinkTime, props.cursorBlink, cursorVisible, isFocused]);
    const displayValue = useMemo(
        () =>
            computeDisplayValue(
                value,
                isFocused,
                hidden,
                hideCharacter,
                props.placeholder,
                hideLast
            ),
        [
            isFocused,
            props.hidden,
            props.placeholder,
            value,
            props.hideCharacter,
            hideLast
        ]
    );
    return (
        <div
            id={`oregan-input-${props.id}`}
            className='oregan-input-container'
            tabIndex={1}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={
                isFocused ?
                    (event) =>
                        inputHandler(event, value, (newValue) => {
                            if (props.onValueChanged) {
                                props.onValueChanged(newValue);
                            }
                            if (hidden && (props.hideDelay ?? 0) > 0) {
                                if (hideLastTimeout) {
                                    clearTimeout(hideLastTimeout);
                                }
                                setHideLast(false);
                                setHideLastTimeout(
                                    setTimeout(() => {
                                        setHideLast(true);
                                        setHideLastTimeout(null);
                                    }, props.hideDelay)
                                );
                            }
                            setValue(newValue);
                        })
                :   null
            }>
            <span className={classList.join(' ')}>
                {displayValue + (isFocused && cursorVisible ? cursor : '')}
            </span>
        </div>
    );
};

export default Input;
