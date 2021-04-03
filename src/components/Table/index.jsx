import React, {useRef} from 'react';
import ProTable from "@ant-design/pro-table";
import styles from "@/components/Table/index.less";



const TableData = (props) => {
    const {columns, search, toolBarRender, scroll, dataSource} = props;
    // console.log("pay-传递过来的值被渲染导视图")
    // debugger
    // debugger
    const actionRef = useRef();
    return (
        <ProTable
            actionRef={actionRef}
            // 添加类
            className={styles.header}
            // 表头配置项
            columns={columns}
            request={async (params, sort, filter) => {
                let data = Object.assign(dataSource)
                // console.log(params)
                // debugger
                return{
                    data: data.records,
                    total: data.total,
                    success: true,
                }
            }}
            // dataSource={dataSource}
            rowKey={"id"}
            // 是否滚动
            scroll={scroll !== "undefined" ? scroll : false}
            // 是否显示工具栏
            toolBarRender={toolBarRender !== 'undefined' ? toolBarRender : false}
            // 是否显示搜索栏
            search={search !== 'undefined' ? search : ({labelWidth: 'auto',})}
            // 重置表单触发
            onReset={() => {
            }}
            // 页码
            pagination={{pageSize: 10,}}
            // 转化 moment 格式数据为特定类型
            dateFormatter="string"
        />
    );
};
export default TableData;
