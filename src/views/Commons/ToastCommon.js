import React from "react";
import {
  Toast, ToastBody, ToastHeader
} from "reactstrap";

const ToastCommon = props => {
    return (
        <div className="toast-custom" hidden={props.hidden}>
            <Toast>
                <ToastHeader icon="danger">
                    {props.title}
                </ToastHeader>
                <ToastBody>
                    {props.body}
                </ToastBody>
            </Toast>
      </div>
    );
}

export default ToastCommon;