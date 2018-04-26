import React from 'react'
import {Modal} from 'antd'
import Form from './form'

export default class FormModal extends React.Component {
  constructor () {
    super();
  }

  render() {
    const {
      modalKey,
      visible,
      title,
      fields,
      onCancel,
      onOk,
      okText,
    } = this.props
    return (
      <Modal
        wrapClassName="form"
        key={modalKey}
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          fields={fields}
          onOk={onOk}
          onCancel={onCancel}
          showCancel
          okText={okText}
        />
      </Modal>
    )
  }
}
