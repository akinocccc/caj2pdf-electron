import {
  CloseOutlined,
  FilePptOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { App, Button, Divider, Popconfirm, Row, Space, Table } from 'antd';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  margin: 10px 0;
  padding: 0 20px;
`;
const StyledDivider = styled(Divider)`
  margin: 5px 0;
`;

const DoneList = (): JSX.Element => {
  const { modal } = App.useApp();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [doneList, setDoneList] = useState<OutputFileObject[]>(
    api.store.get('doneList', [])
  );

  const columns = [
    {
      title: '文件名称',
      dataIndex: 'filename',
      ellipsis: true,
    },
    {
      title: '文件位置',
      dataIndex: 'outputPath',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_: string, { path, outputPath }) => (
        <Space>
          <Button
            size="small"
            icon={<FolderOutlined />}
            onClick={() => showFileInDir(outputPath)}
          ></Button>
          <Button
            size="small"
            icon={<FilePptOutlined />}
            onClick={() => openFile(outputPath)}
          ></Button>
          <Popconfirm
            title="提示"
            description="确定删除该记录？"
            placement="topRight"
            onConfirm={() => removeListItem(path)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" icon={<CloseOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showFileInDir = (filePath: string) => {
    ipcRenderer.send('file:showFileInDir', filePath);
  };

  const openFile = (filePath: string) => {
    ipcRenderer.send('file:openFile', filePath);
  };

  /**
   * @description Remove the record from the list.
   * @param filePaths
   */
  const removeListItem = (filePaths: string[]) => {
    const newDoneList: any[] = [];
    doneList.forEach((item) => {
      if (filePaths.includes(item.path) === false) {
        newDoneList.push(item);
      }
    });
    setDoneList(newDoneList);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    api.store.set('doneList', doneList);
  }, [doneList]);

  return (
    <>
      <StyledRow justify="end">
        <Button
          size="middle"
          icon={<CloseOutlined />}
          onClick={() => {
            modal.confirm({
              title: '提示',
              content: '确定移除所有选中的记录？',
              onOk: () => removeListItem(selectedRowKeys as string[]),
            });
          }}
        >
          删除记录
        </Button>
      </StyledRow>
      <StyledDivider />
      <StyledRow justify="space-between">
        <Table
          style={{ width: '100%' }}
          size="small"
          rowKey={(r): string => r.path}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          columns={columns}
          dataSource={doneList}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 5,
          }}
        />
      </StyledRow>
    </>
  );
};

export default DoneList;
