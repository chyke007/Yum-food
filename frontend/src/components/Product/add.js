import React,{useState} from "react";
import { withRouter  } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProduct,editProduct } from "../../actions/product";
import loader from '../../assets/img/loader-cube.svg'
import {validateAddProduct} from '../../helper'
import { Editor } from '@tinymce/tinymce-react';
import ReactGA from 'react-ga';

const Add = (props) => {
  process.env.NODE_ENV === 'production' &&  ReactGA.pageview(window.location.pathname + window.location.search);
  let name = React.createRef();
  let price = React.createRef();
  const [description,setDescription] = useState("")
  const [realCharacters,setRealCharacters] = useState("")
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(false);
  const [preview,setPreview] = useState(false);

  const refreshForm = () => {
    document.getElementById("saveForm").reset();
    setImage(false)
    setPreview(false)
    setDescription("")
}
  const imageChangedHandler = event => {
    setImage(event.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
  }
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  const handleEditorChange = (content, editor) => {
    let tx = editor.getContent({ format: 'raw' });
    let decoded = decodeHtml(tx);
    // here we strip all HTML tags
    let decodedStripped = decoded.replace(/(<([^>]+)>)/ig, "").trim();
    setRealCharacters(decodedStripped);
    setDescription(content);
  }

  const saveProduct = async ({current:{value: name}},{current:{value: price}},description) => {
    let check = validateAddProduct({name,price,description:realCharacters})
    let dis = {}
    if (check.valid === false) {
      if (check.errors.name) {
        dis.name = check.errors.name
        setErrors(dis)
      }
      if (check.errors.price) {
        dis.price = check.errors.price
        setErrors(dis)
      }
      if (check.errors.description) {
        dis.description = check.errors.description
        setErrors(dis)
      }
      return
    }
    setErrors({})
    if(props.edit){
      return await props.editProduct(name,price,description,props.id,image)
    }
    let res = await props.addProduct(name,price,description,image)
    if(res) return refreshForm()

  }

  return (
    <>
<div className="bg-white m-4 flex flex-col justify-center items-center shadow overflow-hidden sm:rounded-lg">
<button className="my-2 py-2 flex justify-center items-center flex-col"id="product-image" aria-haspopup="true">
    <span className="sr-only">Product Image Preview</span>
   {preview ? (

     <img title="Preview image" className=" h-44 w-44 rounded-full object-contain" src={preview} alt="No preview avaliable"/>
   ) : (
    props.data && props.data.image ? (
      <img title="Preview image" className=" h-44 w-44 rounded-full object-contain" src={props.data.image} alt="No preview avaliable"/>

    ) : (

      <span title="Preview will display here" className="block h-44 w-44 mb-4 rounded-full bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300"></span>
    )
   )}
     <input type="file" onChange={imageChangedHandler}/>
    </button>

  <div className="px-4 py-5 w-full sm:px-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
      {props.edit ? 'Edit Product' : 'Add Product'}
    </h3>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">
      Fill in product details
    </p>
  </div>
  <div className="w-full border-t border-gray-200">
    <form id="saveForm" onSubmit={(e)=> { e.preventDefault(); saveProduct(name,price,description)}}>
    <dl>
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Product Name
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <input ref={name} defaultValue={props.edit && props.data.name} className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ errors.name ? "border-red-500": "border-gray-200"}`} id="grid-text" type="text" placeholder="Jellof rice"/>
        {errors.name ? (
          <p className="text-red-500 text-xs italic">{errors.name}</p>

        ) : ''}
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
         Product price
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span className="w-full inline-flex items-center rounded-md border border-r-1  bg-gray-200 text-gray-700 mb-2 border-gray-200 text-sm  focus:outline-none focus:bg-white focus:border-gray-500">
        <span className="h-8 w-10 px-4 py-2 font-bold cursor-pointer fill-current">₦</span>
        <input ref={price}  defaultValue={props.edit && props.data.price}  className={`appearance-none block w-full py-3 px-4 leading-tight ${ errors.price ? "border-red-500": "border-gray-200"}`} id="grid-price" type='text' placeholder="1000"/>
          <span className="h-8 w-10 px-2 py-2  cursor-pointer fill-current">.00</span>
        </span>
        {errors.price ? (
          <p className="text-red-500 text-xs italic">{errors.price}</p>

        ) : ''}
        </dd>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Product description
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <div className={`border ${ errors.description ? "border-red-500": "border-gray-200"}`}>
        <Editor
         initialValue={props.edit && props.data.description}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | '+
             'alignleft aligncenter alignright alignjustify | '+
             'bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleEditorChange}
         className={`${ errors.description ? "border-red-500": "border-gray-200"}`}
       />
       </div>
            {/* <textarea ref={description}    className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ errors.description ? "border-red-500": "border-gray-200"}`} aria-label=""></textarea> */}
            {errors.description ? (
          <p className="text-red-500 text-xs italic">{errors.description}</p>

        ) : ''}
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <button disabled={props.loading} className={`w-full mt-3 flex justify-center hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-3 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900  text-white cursor-pointer"}`}>
   {props.loading ?  (
     <>
     <img src={loader} className="h-6 w-10 px-2 fill-current" alt="loading..."/>
     loading &nbsp;...
     </>
   ): props.edit ? "EDIT" :"ADD"}
  </button>
        </dd>
      </div>
     </dl>
     </form>
  </div>
</div>
</>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading.status
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addProduct,editProduct }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));
