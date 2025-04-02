import React, {useState} from 'react';

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
 * The application index page component.
 *
 * @type {React.FunctionComponent<InputProps>}
 */
const Input = (props) => {
    const hideCharacter = (props.hideCharacter ?? '')[0] || '*';
    const hidden = props.hidden ?? false;
    const [isFocused, setFocused] = useState(false);
    const [value, setValue] = useState(null);
    const classList = ['oregan-input'];
    if (!value && props.placeholder) {
        classList.push('oregan-input-placeholder');
    }
    return (
        <div
            id={`oregan-input-${props.id}`}
            className='oregan-input-container'
            tabIndex={1}
            onFocus={(event) => {
                setFocused(true);
            }}
            onKeyUp={
                isFocused ?
                    (event) =>
                        inputHandler(event, value, (newValue) => {
                            if (props.onValueChanged) {
                                props.onValueChanged(newValue);
                            }
                            setValue(newValue);
                        })
                :   null
            }>
            <span className={classList.join(' ')}>
                {(hidden && value ?
                    Array.from(value).map(() => hideCharacter)
                :   value) ||
                    props.placeholder ||
                    ''}
            </span>
        </div>
    );
};

export default Input;
