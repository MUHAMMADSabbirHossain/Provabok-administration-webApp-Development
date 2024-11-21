import Swal from "sweetalert2";
import useAxiosPrivate from "./useAxiosPrivate";

const useImgUploader = () => {
    const imgHostingKey = import.meta.env.VITE_IMAGE_APIKEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imgHostingKey}`;
    const axiosPrivate = useAxiosPrivate();

    const imgUploader = async (imgInputedFile) => {
        console.log(imgInputedFile);
        // image (required) A binary file, base64 data, or a URL for an image. (up to 32 MB)

        const imgFile = new FormData();
        imgFile.append(`image`, imgInputedFile);

        const imgUploadedRes = await axiosPrivate.post(imgHostingApi, imgFile, {
            headers: {
                "Content-Type": "application/octet-stream"
            }
        });
        // console.log(imgUploadedRes); // axios
        // console.log(imgUploadedRes.data); // image server

        if (imgUploadedRes?.data?.status === 200) {
            // console.log(imgUploadedRes?.data?.data);
            const imgLinks = imgUploadedRes?.data?.data;
            const img = {
                display_url: imgLinks?.display_url,
                delete_url: imgLinks?.delete_url,
                img: imgLinks?.image?.url,
                medium: imgLinks?.medium?.url,
                thumb: imgLinks?.thumb?.url,
            };

            return (img);

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Image server response error, please try again.</a>',
            });
        };
    };

    return { imgUploader };
};

export default useImgUploader;