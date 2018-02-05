let lzy={}
lzy.uploadExcelButton=
	Vue.component('uploadExcelButton',{
	template: '<div>' +
	'        <el-button :loading="loading" type="primary" @click="handleUpload">选择excel上传</el-button>' +
	'        <input id="excel-upload-input" type="file" accept=".xls .xlsx" class="c-hide" @change="handleFileChange">' +
	'    </div>'
})