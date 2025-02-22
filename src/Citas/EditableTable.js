import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import '../../src/index.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr className="" {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item className="text-center"
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 0,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td className="" {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Medicinas',
        dataIndex: 'Medicinas',
        // width: '20%',
        editable: true,

      },
      {
        title: 'Dosis',
        dataIndex: 'Dosis',
        editable: true,
      },
      {
        title: 'Frecuencia',
        dataIndex: 'Frecuencia',
        editable: true,
        
    },
      {
        title: 'Duración',
        dataIndex: 'Duración',
        editable: true,
      },
      {
        title: 'Operación',
        dataIndex: 'Operación',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/>
            </Popconfirm>
          ) : null,
      },
    ];
    // this.state = {
    //   dataSource: [
    //     {
    //       key: '0',
    //       Medicinas: 'Apronax',
    //       Dosis: '1 tableta',
    //       Frecuencia: 'Cada cuatro horas',
    //       Duración: '1 mes',
    //     },
    //     {
    //       key: '1',
    //       Medicinas: 'Hierro',
    //       Dosis: '1 cucharada',
    //       Frecuencia: 'Cada cuatro horas',
    //       Duración: '1 mes',
    //     },
    //   ],
    //   count: 2,
    // };
    this.state = {
        dataSource: [

        ],
        count: 2,
      };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      Medicinas: 'Hierro C',
      Dosis: '1 cucharada',
      Frecuencia: 'Cada cuatro horas',
      Duración: '1 mes'
    };
    // const newData = {
    //     key: count,
    //     Medicinas: '',
    //     Dosis: '',
    //     Frecuencia: '',
    //     Duración: ''
    //   };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Añadir medicamento
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
        //   className="text-center"
        />
      </div>
    );
  }
}

export default EditableTable;