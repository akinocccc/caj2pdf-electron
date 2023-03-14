import {
  CloseOutlined,
  FrownTwoTone,
  LoadingOutlined,
  MehTwoTone,
  PlusOutlined,
  RetweetOutlined,
  SmileTwoTone,
} from '@ant-design/icons';
import { App, Button, Col, Divider, Popconfirm, Row, Space, Table } from 'antd';
import { ipcRenderer } from 'electron';
import { useState } from 'react';
import styled from 'styled-components';

interface FileObject {
  filename: string;
  path: string;
}

const StyledRow = styled(Row)`
  margin: 10px 0;
  padding: 0 20px;
`;

const StyledDivider = styled(Divider)`
  margin: 5px 0;
`;

const STATUS = [
  <>
    <Space>
      <MehTwoTone />
      待转换
    </Space>
  </>,
  <>
    <Space>
      正在转换
      <LoadingOutlined />
    </Space>
  </>,
  <>
    <Space>
      <SmileTwoTone twoToneColor="green" />
      已完成
    </Space>
  </>,
  <>
    <Space>
      <FrownTwoTone twoToneColor="red" />
      转换失败
    </Space>
  </>,
];

const Transformer = (): JSX.Element => {
  const { message, modal } = App.useApp();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [fileList, setFileList] = useState<FileObject[]>([]);
  const [fileStatusMap, setFileStatusMap] = useState<any>({});
  const columns = [
    {
      title: '文件名称',
      dataIndex: 'filename',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_: string, { path }) => STATUS[fileStatusMap[path].status || 0],
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: (_: string, { path, filename }) => (
        <Space>
          <Button
            size="small"
            icon={<RetweetOutlined />}
            disabled={fileStatusMap[path].status === 1}
            onClick={() => transform([{ path, filename }])}
          ></Button>

          <Popconfirm
            title="提示"
            description="确定删除该任务？"
            placement="topRight"
            onConfirm={() => removeTasks([path])}
            okText="确定"
            cancelText="取消"
          >
            <Button
              size="small"
              disabled={fileStatusMap[path].status === 1}
              icon={<CloseOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const selectFiles = () => {
    ipcRenderer.invoke('transform:selectFile').then((filePaths: string[]) => {
      const existFiles: string[] = [];
      for (const path of filePaths) {
        const filename = (path.match(/(?<=\\)[^\\]*(?=\.)/) as string[])[0];
        if (fileStatusMap[path] === undefined) {
          fileList.push({
            filename,
            path,
          });
          fileStatusMap[path] = { filename, status: 0 };
        } else {
          message.warning(`文件【${filename}】已在列表中`);
          existFiles.push(filename);
        }
      }
      // Reduce the number of updates.
      if (existFiles.length < filePaths.length) {
        setFileStatusMap({ ...fileStatusMap });
        setFileList([...fileList]);
      }
    });
  };

  /**
   * @description Start transform tasks.
   * @param filePaths
   */
  const transform = (filePaths: any[]) => {
    filePaths.forEach((item) => (fileStatusMap[item.path].status = 1));
    setFileStatusMap({ ...fileStatusMap });
    ipcRenderer.invoke('transform:start', filePaths).then((res) => {
      console.log(res);
      const STATUS_TIPS = {
        2: ['success', '转换成功'],
        3: ['error', '转换失败'],
      };
      res.forEach((item: any) => {
        fileStatusMap[item.path] = {
          filename: item.filename,
          status: item.status,
        };
        const [type, tips] = STATUS_TIPS[item.status];
        message[type](`文件【${item.filename}】${tips}`);
      });
      setFileStatusMap({ ...fileStatusMap });
    });
  };

  /**
   * @description Remove the tasks from the list.
   * @param filePaths
   */
  const removeTasks = (filePaths: string[]) => {
    const newFileList: any[] = [];
    fileList.forEach((item) => {
      if (filePaths.includes(item.path) === false) {
        newFileList.push(item);
      }
    });
    filePaths.forEach((path) => {
      delete fileStatusMap[path];
    });
    setFileList(newFileList);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  return (
    <div>
      <StyledRow justify="space-between">
        <Col>
          <Button size="middle" icon={<PlusOutlined />} onClick={selectFiles}>
            添加
          </Button>
        </Col>
        <Col>
          <Space>
            <Button
              size="middle"
              icon={<CloseOutlined />}
              onClick={() => {
                modal.confirm({
                  title: '提示',
                  content: (
                    <>
                      确定移除以下文件的转换任务？
                      {selectedRowKeys.map((item) => (
                        <>
                          <br />【{fileStatusMap[item].filename}】
                        </>
                      ))}
                    </>
                  ),
                  onOk: () => removeTasks(selectedRowKeys as string[]),
                });
              }}
            >
              移除任务
            </Button>
            <Button
              size="middle"
              icon={<RetweetOutlined />}
              onClick={() =>
                transform(
                  selectedRowKeys.map((item) => ({
                    path: item,
                    filename: fileStatusMap[item].filename,
                  }))
                )
              }
            >
              开始转换
            </Button>
          </Space>
        </Col>
      </StyledRow>
      <StyledDivider />
      <StyledRow>
        <Table
          style={{ width: '100%' }}
          size="small"
          rowKey={(r): string => r.path}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps(r) {
              if (fileStatusMap[r.path].status === 1) {
                return { disabled: true };
              } else {
                return { disabled: false };
              }
            },
          }}
          columns={columns}
          dataSource={fileList}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 5,
          }}
        />
      </StyledRow>
    </div>
  );
};

export default Transformer;
