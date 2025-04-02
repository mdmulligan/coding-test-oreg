import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import IndexPage from './pages/index';

const root = createRoot(
    document.getElementById('root') ??
        document.getElementById('app') ??
        document.body
);
root.render(
    <StrictMode>
        <IndexPage />
    </StrictMode>
);
