//-- NPM Packages
import React, {useState} from 'react';

//-- Project Code
import Input from '../../components/input';

//-- Assets
import logo from '/assets/oregan-networks.png';

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
    const [passwordHidden, setPasswordHidden] = useState(true);
    const passwordInputClassList = ['bi'];
    passwordInputClassList.push(
        passwordHidden ? 'bi-eye-fill' : 'bi-eye-slash-fill'
    );
    return (
        <div className='page-index'>
            <div className='logo-container'>
                <img src={logo} />
            </div>
            <div className='input-form'>
                <Input id='input-email' placeholder='Email' cursorBlink />
                <div className='input-form-password'>
                    <Input
                        id='input-password'
                        placeholder='Password'
                        hidden={passwordHidden}
                        hideDelay={1500}
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
        </div>
    );
};

export default IndexPage;
