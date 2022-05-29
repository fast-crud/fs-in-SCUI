import * as api from './api';
// eslint-disable-next-line no-unused-vars
export default function ({expose}) {
	const pageRequest = async (query) => {
		return await api.GetList(query);
	};
	const editRequest = async ({form, row}) => {
		form.id = row.id;
		return await api.UpdateObj(form);
	};
	const delRequest = async ({row}) => {
		return await api.DelObj(row.id);
	};

	const addRequest = async ({form}) => {
		return await api.AddObj(form);
	};

	return {
		crudOptions: {
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},
			rowHandle: {
				width: 300,
			},
			columns: {
				id: {
					title: 'ID',
					type: 'text',
					column: {width: 55, align: 'center'},
				},
				title: {
					title: '商品标题',
					type: 'text',
				},
				code: {
					title: '商品代码',
					search: {show: true},
					type: 'text',
				},
				images: {
					title: '图片',
					type: 'image-uploader',
					column:{
						component:{
							previewTeleported:true
						}
					}
				},
				price: {
					title: '价格',
					sortable: true,
				},
				store: {
					title: '库存',
					type: 'number',
				},
				intro: {
					title: '简介',
					type: 'text-area',
					column: {
						width: 300,
						showOverflowTooltip: true,
					},
				},
				content: {
					title: '详情',
					type: 'editor-ueditor',
					form: {
						itemProps: {labelWidth: '0px'},
					},
				},
			},
			form: {
				group: {
					type: 'collapse', // tab
					accordion: false, //手风琴模式
					groups: {
						base: {
							slots: {
								//自定义header
								title: () => {
									return (
										<span style={'color:green;'}>
                      						<el-icon><List /></el-icon> 商品基础
                    					</span>
									);
								},
							},
							columns: ['code', 'title', 'images'],
						},
						price: {
							title: '库存价格',
							columns: ['store', 'price'],
						},
						info: {
							title: '详情',
							collapsed: true, //默认折叠
							columns: ['intro', 'content'],
						},
						// custom: {
						//   title: "自定义",
						//   collapsed: false,
						//   show(context) {
						//     console.log("custom context", context);
						//     return context.mode === "view";
						//   },
						//   disabled: false,
						//   icon: "el-icon-warning-outline",
						//   columns: ["custom", "custom2"]
						// }
					},
				},
			},
		},
	};
}
