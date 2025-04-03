//-- NPM Packages
import React, {useEffect, useMemo, useRef, useState} from 'react';
import KeyboardReact from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

//-- Project Code
import Input from '../../components/input';

//-- Assets
import logo from '/assets/oregan-networks.png';

const useActiveElement = () => {
    const [activeElement, setActiveElement] = useState(document.activeElement);
    const handleFocusIn = () => {
        setActiveElement(document.activeElement);
    };
    useEffect(() => {
        document.addEventListener('focusin', handleFocusIn);
        return () => {
            document.removeEventListener('focusin', handleFocusIn);
        };
    }, []);
    return activeElement;
};

/**
 * The properties used to render an {@link IndexPage} component.
 *
 * @typedef IndexPageProps
 */

/**
 * The application index page component.
 *
 * @type {React.FunctionComponent<IndexPageProps>}
 */
const IndexPage = () => {
    const activeElement = useActiveElement();
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const passwordInputClassList = ['bi'];
    passwordInputClassList.push(
        passwordHidden ? 'bi-eye-fill' : 'bi-eye-slash-fill'
    );
    const activeKeyboardName = useMemo(() => {
        return (
            activeElement === usernameInputRef.current ? 'emailInput'
            : activeElement === passwordInputRef.current ? 'passwordInput'
            : ''
        );
    }, [activeElement]);

    return (
        <div className='page-index'>
            <div className='logo-container'>
                <img src={logo} />
            </div>

            <div className='input-form'>
                <Input
                    id='input-email'
                    placeholder='Email'
                    cursorBlink
                    value={username}
                    onValueChanged={(value) => {
                        setUsername(value);
                    }}
                    ref={usernameInputRef}
                />
                <div className='input-form-password'>
                    <Input
                        id='input-password'
                        placeholder='Password'
                        hidden={passwordHidden}
                        hideDelay={1500}
                        cursorBlink
                        value={password}
                        onValueChanged={(value) => setPassword(value)}
                        ref={passwordInputRef}
                    />
                    <div
                        className='input-show-password'
                        tabIndex={1}
                        onClick={() => setPasswordHidden(!passwordHidden)}>
                        <span
                            className={passwordInputClassList.join(' ')}></span>
                    </div>
                </div>
            </div>
            <div className='keyboard'>
                <KeyboardReact
                    preventMouseDownDefault
                    preventMouseUpDefault
                    stopMouseDownPropagation
                    stopMouseUpPropagation
                    onChangeAll={(inputs) => {
                        setUsername(inputs['emailInput']);
                        setPassword(inputs['passwordInput']);
                    }}
                    inputName={activeKeyboardName}
                    beforeInputUpdate={(instance) => {
                        if (username) {
                            instance.setInput(username, 'emailInput');
                        }
                        if (password) {
                            instance.setInput(password, 'passwordInput');
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default IndexPage;
