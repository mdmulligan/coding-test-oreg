import React, {useState} from 'react';
import Input from '../../components/input';

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
            <div className='input-form'>
                <Input id='input-email' placeholder='Email' />
                <div className='input-form-password'>
                    <Input
                        id='input-password'
                        placeholder='Password'
                        hidden={passwordHidden}
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
