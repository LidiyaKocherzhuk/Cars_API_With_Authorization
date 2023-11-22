import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";

import {router} from "./router";
import {store} from "./redux";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
