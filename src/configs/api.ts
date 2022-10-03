export const BaseUrl = 'http://127.0.0.1:5000/api';

export const user_get = BaseUrl + '/user';
export const user_create = BaseUrl + '/user/create';
export const user_update = BaseUrl + '/user/update';
export const user_login = BaseUrl + '/user/login';
export const user_verification_email_ = BaseUrl + '/user/verification/';
export const user_upload = BaseUrl + '/user/upload';

export const blog_ = BaseUrl + '/blog';
export const blog_get_ = BaseUrl + '/blog/';
export const blog_create = BaseUrl + '/blog/create';
export const blog_update = BaseUrl + '/blog/update';
export const blog_delete_ = blog_get_;
export const blog_list_ = BaseUrl + '/blog/list';

export const order_ = BaseUrl + '/order';
export const order_get_ = BaseUrl + '/order/';
export const order_create = BaseUrl + '/order/create';
export const order_update = BaseUrl + '/order/update';
export const order_sendmsg = BaseUrl + '/order/sendmsg';