import { useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import LinearProgressWithLabel from "../../components/linearProgressWithLabel/LinearProgressWithLabel";
import { create } from "@mui/material/styles/createTransitions";

export default function NewProduct() {
  const [movie,setMovie ] = useState(null);
  const [img,setImg ] = useState(null);
  const [imgTitle,setImgTitle ] = useState(null);
  const [imgSm,setImgSm ] = useState(null);
  const [trailer,setTrailer ] = useState(null);
  const [video,setVideo ] = useState(null);
  const [uploaded,setUploaded ] = useState(0); // to see how many files have been uploaded to the firebase storage
  const [progress,setProgress] = useState(0);
  const [uploading,setUploading] = useState(false);

  const {dispatch} = useContext(MovieContext);
  


  

  const handleChange=(e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value});
  };

  const upload =(item)=>{
    setUploading(true);
    item.forEach((item)=>{
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask  = uploadBytesResumable(storageRef, item.file);;
      uploadTask.on("state_changed",
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },(err)=>{
        console.log(err);
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          setMovie(prev=>{return {...prev,[item.label]:url}});
          setUploaded((prev)=>prev+1);
        });
      });
    });
  };

  const handleUpload = (e)=>{
    e.preventDefault();
    upload([
      {file:img,label:"img"},
      {file:imgTitle,label:"imgTitle"},
      {file:imgSm,label:"imgSm"},
      {file:trailer,label:"trailer"},
      {file:video,label:"video"},
    ]);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    createMovie(movie,dispatch);
    setUploading(false);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      {uploading && <LinearProgressWithLabel value={progress}/>}
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="fileImg" name="img" onChange={(e)=>setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input  type="file" id="fileTitleImg" name="imgTitle" onChange={(e)=>setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="fileThumbImg" name="imgSm" onChange={(e)=>setImgSm(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="description"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="year" name="year"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" name="duration"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" name="limit"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>isSeries?</label>
          <select name="isSeries" id="isSeries"  onChange={handleChange} >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e)=>setTrailer(e.target.files[0])}  />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={(e)=>setVideo(e.target.files[0])}  />
        </div>{uploaded === 5?(<button className="addProductButton" onClick={handleSubmit} >Create</button>):(<button className="addProductButton" onClick={handleUpload}>Upload</button>)}
        
      </form>
    </div>
  );
}
