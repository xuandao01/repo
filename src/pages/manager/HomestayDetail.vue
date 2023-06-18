<template>
    <div class="homestay-detail">
        <div class="homestay-detail__main">
            <div class="homestay-detail__header">
                <div class="header-title">
                    {{ formTitle }}
                </div>
                <div class="header-action" @click="this.$emit('closeDetail')"></div>
            </div>
            <div class="homestay-detail__content">
                <div class="content-leftside">
                    <div class="content-input-area">
                        <div class="input-title">Tiêu đề:</div>
                        <div class="input-value">
                            <input v-model="formData['title']">
                        </div>
                        <div class="input-title">Mô tả:</div>
                        <div class="input-value">
                            <input v-model="formData['description']">
                        </div>
                        <div class="group-area address-area">
                            <div class="group-title">Địa chỉ:</div>
                            <div class="group-content">
                                <div class="group-content-area">
                                    <div class="flex-columns">
                                        <div class="gr-input-title">Tỉnh/Thành phố:</div>
                                        <div class="gr-input-value">
                                            <input v-model="formData['province']">
                                        </div>
                                    </div>
                                    <div class="flex-columns">
                                        <div class="gr-input-title">Quận/Huyện:</div>
                                        <div class="gr-input-value">
                                            <input v-model="formData['district']">
                                        </div>
                                    </div>
                                    <div class="flex-columns">
                                        <div class="gr-input-title">Phường/Xã:</div>
                                        <div class="gr-input-value">
                                            <input v-model="formData['wards']">
                                        </div>
                                    </div>
                                </div>

                                <div class="gr-input-title">Tên đường:</div>
                                <div class="input-value">
                                    <input  v-model="formData['streetAddress']">
                                </div>
                            </div>
                        </div>
                        <div class="group-area address-area">
                            <div class="group-title">Giá thành:</div>
                            <div class="group-content">
                                <div class="group-content-area">
                                    <div class="flex-columns" style="flex: 1;">
                                        <div class="gr-input-title">Giá gốc(VND):</div>
                                        <div class="gr-input-value">
                                            <input min="0" max="9999999999" type="number" v-model="formData['price']">
                                        </div>
                                    </div>
                                    <div class="flex-columns" style="flex: 0.5;">
                                        <div class="gr-input-title">Khuyến mại(%):</div>
                                        <div class="gr-input-value">
                                            <input min="0" max="100" type="number" v-model="formData['discount']">
                                        </div>
                                    </div>
                                </div>

                                <div class="gr-input-title" style=" margin-top: 12px; font-family: Roboto-bold;">Giá thuê:</div>
                                <div class="price-value">
                                    {{ Math.round(formData['price']*(100 - formData['discount'])/100).toLocaleString() }}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="content-rightside">
                    <div class="upload-thumbnail__area">
                        <div class="upload-title" style="margin-top: 30px; margin-left: 55px; font-family: Roboto-bold;">Ảnh chính:</div>
                        <div class="file-upload">
                            <div class="image-upload-wrap" v-if="!previewImage">
                            <input class="file-upload-input" type='file' @change="readURL(this)" accept="image/*" />
                                <div class="drag-text">
                                    <h3>Kéo ảnh vào hoặc click để thêm ảnh</h3>
                                </div>
                            </div>

                            <div v-else class="preview-image">
                                <div class="clear-image" @click="previewImage = ''"></div>
                                <img style="max-height: 150px; max-width: 250px" :src="previewImage">
                            </div>
                        </div>
                    </div>
                    <div class="sub-image-area">
                        <div class="upload-title" style="margin-top: 10px; margin-left: 55px; font-family: Roboto-bold;">Ảnh phụ:</div>
                        <div class="file-upload__multiple">
                            <div class="image-upload-wrap" v-if="!subImage || subImage.length == 0">
                            <input class="file-upload-input" type='file' multiple @change="readMultiple(this)" accept="image/*" />
                                <div class="drag-text">
                                    <h3>Kéo ảnh vào hoặc click để thêm ảnh</h3>
                                </div>
                            </div>
                            <div v-else class="preview-subimage">
                                <div class="subimage-list" v-for="(item,index) in subImage" :key="index">
                                    <div class="delete-image" @click="deleteSubImage(index)"></div>
                                    <img  style="max-height: 50px; max-width: 50px; min-width: 40px; min-height: 40px;" :src="item">
                                </div>
                            </div>
                            <div v-if="subImage && subImage.length > 0" style="position: absolute; bottom: -20px; display: flex; column-gap: 10px">
                                <div class="aditional-btn add-more-btn">
                                <input class="file-upload-input" style="width: 76px; cursor: pointer;" type='file' multiple @change="readMultiple(this)" accept="image/*" />
                                    <div class="drag-text" style="cursor: pointer;">
                                        Thêm ảnh
                                    </div>
                                </div>
                                <div class="aditional-btn remove-all-btn" @click="subImage = []">Xóa hết</div>
                            </div>
                        </div>
                    </div>
                    <div class="utility-inf">
                        <div style="margin-left: 55px; margin-top: 30px; font-family: Roboto-bold;">Tiện ích:</div>
                        <div class="utility-list" style="max-width: 200px; margin-left: 55px; position: relative; max-height: 50px; overflow: auto; flex-wrap: wrap; column-gap: 8px; display: flex; white-space: nowrap;">
                            <div class="utility-item" style="height: 30px; background-color: #e0e0e0; line-height: 30px;
                                padding: 0 7px; border-radius: 4px; margin-bottom: 8px;" v-for="(item, index) in utilityList" :key="index">
                                <div class="utility-value" style="position: relative;">{{ item }}
                                    <div class="remove-icon" @click="removeUtility(index)"></div>
                                </div>
                            </div>
                        </div>
                        <div class="add-utility" style="margin-left: 55px;">Thêm tiện ích
                            <div class="dropdown-icon"></div>
                            <div class="all-utility">
                                <div v-for="(item, index) in allUtility" :key="index">{{ item }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="homestay-detail__footer" style="display: flex; justify-content: space-between; padding: 0 20px;">
                <div class="footer-btn">
                    <button @click="this.$emit('closeDetail')" style="padding: 4px 15px; cursor: pointer; margin-top: 8px; background-color: #fff; outline: unset; border: solid 1px #111111; border-radius: 4px;">Hủy</button>
                </div>
                <div class="footer-btn">
                    <button @click="this.saveRequest" style="padding: 4px 15px; margin-top: 8px; cursor: pointer; background-color: #432dd4; color: #fff; outline: unset; border: unset; border-radius: 4px;">Lưu</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { watch } from 'vue'

export const ActionMode = {
    create: 0,
    duplicate: 1,
    modify: 2,
}
export default {
    props:{
        homestay: {
            type: Object,
            required: false,
            default: null,
        },

        actionMode: {
            type: Number,
            required: false,
            default: 0,
        }
    },

    computed:{
        formTitle(){
            if (this.actionMode == ActionMode.create || this.actionMode == ActionMode.duplicate) return 'Thêm mới homestay';
            else return 'Cập nhật homestay';
        }
    },
    
    created(){
        this.formData = this.homestay;
        if (this.actionMode == ActionMode.duplicate || this.actionMode == ActionMode.modify){
            if (this.homestay && this.homestay['_id'])
                this.getHomestayData(this.homestay['_id'])
        }
    },

    mounted(){
        this.options.max = "Max";
        this.options.ready = "Ready";
        this.options.select = "Choosed";
    },

    methods:{

        prepareData(){
            if (this.previewImage) this.formData['thumbnail'] = this.previewImage;
            if (this.subImage) this.formData['imgs'] = this.subImage;

        },

        validate(){
            if (this.formData['discount'] < 0 || this.formData['discount'] > 100){
                this.currentError = 'Giảm giá';
                return false;
            }
            return true;
        },

        async saveRequest(){
            if (this.validate()){
                this.prepareData();
                let token = localStorage.getItem("user");
                if (!token){return}
                let endpoint = this.actionMode == ActionMode.modify ? `http://localhost:8000/api/v1/homeStays/${this.formData['_id']}` : `http://localhost:8000/api/v1/homeStays`
                let options = {
                    method: (this.actionMode == ActionMode.create || this.actionMode == ActionMode.duplicate) ? "POST" : "PUT",
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, },
                    body: JSON.stringify(this.formData),
                }
                let res = await fetch(endpoint, options);
                let data = res.json();
                console.log(data);
            } else {
                
            }
        },

        async getHomestayData(id){
            let res = await fetch(`http://localhost:8000/api/v1/homeStays/${id}`);
            let data = await res.json();
            this.formData = data['data'];
            this.previewImage = this.formData.thumbnail;
            this.subImage = this.formData.imgs;
            if (this.formData.utilityIds){
                this.formData.utilityIds.forEach(el => this.utilityList.push(el['name']));
            }
        },

        removeUtility(index){
            if (index == null || index == undefined) return;
            else {
                let tmpArr = [];
                for (let i=0;i<this.utilityList.length;i++)
                    if (i != index) tmpArr.push(this.utilityList[i]);
                this.utilityList = tmpArr;
            }
        },

        deleteSubImage(index){
            if (index == null || index == undefined) return;
            else {
                let tmpArr = [];
                for (let i=0;i<this.subImage.length;i++)
                    if (i != index) tmpArr.push(this.subImage[i]);
                this.subImage = tmpArr;
            }
        },

        preventDefault(event) {
            event.preventDefault();
        },

        readURL() {
            const image = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = event =>{
                this.previewImage = event.target.result;
                console.log(this.previewImage);
            };
        },

        readMultiple(){
            var selectedFiles = event.target.files;
            for (let i=0; i<selectedFiles.length; i++)
            {
                let reader = new FileReader(); //instantiate a new file reader
                reader.addEventListener('load', function(){
                    this.subImage.push(reader.result)
                }.bind(this), false);  //add event listener
                reader.readAsDataURL(selectedFiles[i]);
            }
        },

        removeUpload() {
            
        },

        images(e){
            let images = [];
            e.map(res=> images.push(res));
            console.log(images);
        }

    },
    
    data() {
        return {
            previewImage: "",
            component: {},
            options : {},
            imageSize : 2000000, // 2MB
            formatType : ['image/jpeg', 'image/png', 'image/jpg'],
            subImage: [],
            utilityList: [],
            allUtility: [],
            formData: null,
            currentError: null,
        }
    },
}
</script>
<style scoped>

    .remove-icon{
        height: 15px;
        width: 15px;
        background: url('@/assets/icons/icons8-circled-x-15 (1).png');
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: -3px;
        right: -15px;
        cursor: pointer;
    }

    .utility-inf{
        position: relative;
    }

    .add-utility{
        margin-top: 8px;
        margin-left: 22px;
        cursor: pointer;
        height: 30px;
        padding: 0 10px;
        width: 125px;
        color: #fff;
        line-height: 30px;
        border-radius: 4px;
        background-color: #432dd4;
        position: relative;
    }
    
    .dropdown-icon{
        height: 15px;
        width: 15px;
        background: url('@/assets/icons/icons8-arrow-down-15.png');
        position: absolute;
        right: 8px;
        top: 8px;
    }

    .add-more-btn{
        border: unset;
        outline: unset;
        user-select: none;
        cursor: pointer;
    }

    .aditional-btn{
        padding: 4px 6px;
        background-color: #432dd4;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }

    .file-upload__multiple{
        padding: 20px 20px 20px 60px;
        position: relative;
    }

    .subimage-list{
        height: 50px;
        width: 50px;
        position: relative;
    }

    .preview-image{
        position: relative;
    }
    
    .preview-subimage{
        position: relative;
        display: flex;
        column-gap: 8px;
        overflow: auto;
        width: 385px;
    }

    .clear-image, .delete-image{
        height: 15px;
        width: 15px;
        background: url('@/assets/icons/icons8-clear-15.png');
        background-color: #e0e0e05c;
        position: absolute;
        top: 0;
        cursor: pointer;
    }


    .address-area{
        margin-top: 18px;
    }

    .group-title{
        font-size: 16px;
        font-family: Roboto-bold;
    }

    .flex-column{
        flex: 1;
    }

    .group-content-area{
        display: flex;
        column-gap: 8px;
    }

    .input-title{
        height: 28px;
        width: 100%;
        font-size: 16px;
        font-family: Roboto-bold;
        line-height: 32px;
    }

    .input-value, .gr-input-value{
        height: 28px;
        width: 100%;
    }

    .input-value input, .gr-input-value input {
        height: 100%;
        width: 100%;
        padding: 0 10px;
    }

    input {
        outline: unset;
        border: solid 1px #111111;
    }

    .content-input-area{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .content-leftside{
        height: calc(100% - 20px);
        width: calc(100% - 10px);
        margin-right: 10px;
        margin-top: 20px;
    }
    
    .content-rightside{
        height: 100%;
        width: calc(100% - 10px);
        margin-left: 10px;
    }

    .homestay-detail__content{
        height: calc(100% - 100px);
        width: calc(100% - 40px);
        margin: 0 20px;
        border-top: solid #a0a0a0 1px;
        border-bottom: solid #a0a0a0 1px;
        display: flex;
    }

    .homestay-detail__header{
        height: 50px;
        width: calc(100% - 0px);
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
    }

    .header-title{
        font-size: 24px;
        font-family: Roboto-bold;
        line-height: 32px;
    }

    .header-action{
        height: 30px;
        width: 30px;
        background: url('@/assets/icons/icons8-close-30.png');
    }

    .homestay-detail{
        height: 100vh;
        width: 100%;
        background-color: #111111a7;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 199;
    }

    .homestay-detail__main{
        height: 600px;
        width: 1000px;
        position: absolute;
        top: calc((100vh - 600px)/2);
        left: calc((100vw - 1000px)/2);
        background-color:#fff;
        border-radius: 4px;
    }

    .file-upload {
    background-color: #ffffff;
    width: 150px;
    margin: 0 50px;
    padding: 10px;
    }

    .file-upload-btn {
    width: 100%;
    margin: 0;
    color: #fff;
    background: #624bff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border-bottom: 4px solid #4f37ed;
    transition: all .2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
    }

    .file-upload-btn:hover {
    background: #432dd4;
    color: #ffffff;
    transition: all .2s ease;
    cursor: pointer;
    }

    .file-upload-btn:active {
    border: 0;
    transition: all .2s ease;
    }

    .file-upload-content {
    display: none;
    text-align: center;
    }

    .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
    }

    .image-upload-wrap {
    border: 4px dashed #624bff;
    position: relative;
    }

    .image-dropping,
    .image-upload-wrap:hover {
    background-color: #beb4fe;
    border: 4px dashed #ffffff;
    }

    .image-title-wrap {
    padding: 0 15px 15px 15px;
    color: #222;
    }

    .drag-text {
    text-align: center;
    }

    .drag-text h3 {
    font-weight: 100;
    text-transform: uppercase;
    color: #624bff;
    padding: 10px 0;
    }

    .file-upload-image {
    max-height: 200px;
    max-width: 200px;
    margin: auto;
    padding: 20px;
    }

    .remove-image {
    width: 200px;
    margin: 0;
    color: #fff;
    background: #cd4535;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border-bottom: 4px solid #b02818;
    transition: all .2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
    }

    .remove-image:hover {
    background: #c13b2a;
    color: #ffffff;
    transition: all .2s ease;
    cursor: pointer;
    }

    .remove-image:active {
    border: 0;
    transition: all .2s ease;
    }
</style>