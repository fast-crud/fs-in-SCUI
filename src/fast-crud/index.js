import {FastCrud} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import {FsExtendsUploader, FsExtendsEditor} from "@fast-crud/fast-extends";
import "@fast-crud/fast-extends/dist/style.css";
import UiElement from "@fast-crud/ui-element";
import http from "@/utils/request"
import './style.scss'

function install(app, options = {}) {
	app.use(UiElement);
	app.use(FastCrud, {
		i18n: options.i18n,
		async dictRequest({url}) {
			//获取字典请求
			return await http.post({url, method: "post"});
		},
		/**
		 * useCrud时会被执行
		 * @param context，useCrud的参数
		 */
		// eslint-disable-next-line no-unused-vars
		commonOptions(context = {}) {
			const opts = {
				table: {
					size: "default",
					pagination: false
				},
				rowHandle: {
					buttons: {
						view: {size: "default", icon: 'ElIconView'},
						edit: {size: "default",icon: 'ElIconEdit'},
						remove: {type: "danger", size: "default" ,icon:"ElIconDelete"}
					},
					dropdown: {
						more: {
							size: "default"
						}
					}
				},
				request: {
					// 查询参数转换
					transformQuery: ({ page, form, sort }) => {
						const order = sort == null ? {} : { orderProp: sort.prop, orderAsc: sort.asc };
						return { current: page.currentPage, size: page.pageSize, ...form, ...order };
					},
					transformRes: ({ res }) => {
						return { currentPage: res.current, pageSize: res.size, ...res };
					},
				},
				form: {
					display: "flex", //表单布局
				}
			};

			return opts
		}
	});

	// fast-extends里面的扩展组件均为异步组件，只有在使用时才会被加载，并不会影响首页加载速度
	//安装editor
	app.use(FsExtendsEditor, {
		//编辑器的公共配置
		wangEditor: {},
		quillEditor: {}
	});
	//安装uploader 公共参数
	app.use(FsExtendsUploader, {
		defaultType: "cos",
		cos: {
			domain: "https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com",
			bucket: "d2p-demo-1251260344",
			region: "ap-guangzhou",
			secretId: "", //
			secretKey: "", // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
			async getAuthorization() {
				// 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
				const ret = await http.get("http://www.docmirror.cn:7070/api/upload/cos/getAuthorization")
				// 返回结构如下
				// ret.data:{
				//   TmpSecretId,
				//   TmpSecretKey,
				//   XCosSecurityToken,
				//   ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
				// }
				console.log("cos authorization:",ret)
				return  ret.data;
			},
			successHandle(ret) {
				// 上传完成后可以在此处处理结果，修改url什么的
				console.log("success handle:", ret);
				return ret;
			}
		},
		alioss: {
			domain: "https://d2p-demo.oss-cn-shenzhen.aliyuncs.com",
			bucket: "d2p-demo",
			region: "oss-cn-shenzhen",
			accessKeyId: "",
			accessKeySecret: "",
			async getAuthorization() {
				// 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
				const ret = await http.get("http://www.docmirror.cn:7070/api/upload/alioss/getAuthorization");
				console.log("ret", ret);
				return ret;
			},
			sdkOpts: {
				// sdk配置
				secure: true // 默认为非https上传,为了安全，设置为true
			},
			successHandle(ret) {
				// 上传完成后可以在此处处理结果，修改url什么的
				console.log("success handle:", ret);
				return ret;
			}
		},
		qiniu: {
			bucket: "d2p-demo",
			async getToken() {
				const ret = await http.get("http://www.docmirror.cn:7070/api/upload/qiniu/getToken");
				return ret; // {token:xxx,expires:xxx}
			},
			successHandle(ret) {
				// 上传完成后可以在此处处理结果，修改url什么的
				console.log("success handle:", ret);
				return ret;
			},
			domain: "http://d2p.file.handsfree.work"
		},
		form: {
			action: "http://www.docmirror.cn:7070/api/upload/form/upload",
			name: "file",
			withCredentials: false,
			uploadRequest: async ({action, file}) => {
				// @ts-ignore
				const data = new FormData();
				data.append("file", file);
				return await http.post({
					url: action,
					method: "post",
					headers: {
						"Content-Type": "multipart/form-data"
					},
					data
				});
			},
			successHandle(ret) {
				// 上传完成后的结果处理， 此处应返回格式为{url:xxx}
				return {url: "http://www.docmirror.cn:7070" + ret};
			}
		}
	});
}

export default {
	install
};
