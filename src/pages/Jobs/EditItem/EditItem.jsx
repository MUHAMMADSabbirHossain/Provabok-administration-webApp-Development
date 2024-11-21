import { useParams } from "react-router-dom";
import useJobCategories from "../../../hooks/useJobCategories";
import useJobs from "../../../hooks/useJobs";
import useImgUploader from "../../../hooks/useImgUploader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const EditItem = () => {

    const { categories } = useJobCategories();
    const { id } = useParams();
    const { jobs, refetch } = useJobs();
    const editedItem = jobs.find(seletedjob => seletedjob._id === id);
    const { imgUploader } = useImgUploader();
    const axiosPrivate = useAxiosPrivate();
    console.log(id, editedItem);

    const updateDB = async (jobItem) => {

        const serverRes = await axiosPrivate.patch(`/v1/jobs/edit-item/${id}`, jobItem);
        console.log(serverRes?.data);

        if (serverRes?.data?.modifiedCount === 1) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your job item has been saved successfully.",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Server or DataBase (make sure you modified any things) might get any issue, please try again.</a>',
            });
        };

        refetch();
    };


    const handleEditItem = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const title = form.get(`title`);
        const vacancy = form.get(`vacancy`);
        const orgName = form.get(`orgName`);
        const category = form.get(`category`);
        const salary = form.get(`salary`);
        const radioGovt = form.get(`radioGovt`);
        const radioOrh = form.get(`radio-orh`);
        const email = form.get(`email`);
        const address = form.get(`address`);
        const lastDate = form.get(`lastDate`)
        const imagefile = form.get(`imagefile`);
        const resourceLink = form.get(`resourceLink`);
        const details = form.get(`details`);

        const jobItem = {
            title,
            vacancy,
            orgName,
            category,
            salary,
            radioGovt,
            radioOrh,
            email,
            address,
            lastDate,
            resourceLink,
            details
        };
        console.log(jobItem);

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                // console.log(imagefile);
                if (imagefile?.size > 0) { // if user has changed image file

                    // send image to img server.
                    const imgUploadedRes = await imgUploader(imagefile);

                    if (imgUploadedRes?.display_url) {
                        // add the updated img url link in the jobItem object
                        jobItem.image = imgUploadedRes;
                    };

                    updateDB(jobItem);
                } else { // if user hasn't changed the image file.

                    // add the previous img url link in the jobItem object
                    jobItem.image = editedItem.image;
                    console.log(jobItem);

                    updateDB(jobItem);
                };

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });



    };


    return (
        <div className="space-y-5 my-10">

            <h2 className='text-center bg-gradient-to-bl'> Create Job Item...</h2>

            <div className=" bg-base-200 rounded-3xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleEditItem} className="card-body space-y-5">

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="" className="input input-bordered" defaultValue={editedItem?.title} />
                            </div>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Vacancy</span>
                                </label>
                                <input type="number" name="vacancy" id="vacancy" className="input input-bordered" placeholder="0" defaultValue={editedItem?.vacancy} />
                            </div>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Organization</span>
                                </label>
                                <input type="text" name="orgName" id="orgName" className="input input-bordered" placeholder="Provabok" defaultValue={editedItem?.orgName} />
                            </div>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Salary (fixed or from-to)</span>
                                </label>
                                <input type="text" name='salary' placeholder="follow 100000 or 10000-15000" className="input input-bordered" defaultValue={editedItem?.salary} />
                            </div>

                            <div className="grid grid-cols-2 border input-bordered shadow-2xl p-4 rounded-xl">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Gov't</span>
                                    </label>
                                    <input type="radio" name="radioGovt" className="radio" value={`govt`} defaultChecked={editedItem?.radioGovt} />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Non-Gov't</span>
                                    </label>
                                    <input type="radio" name="radioGovt" className="radio" value={`non-govt`} defaultChecked={editedItem?.radioGovt} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 px-3 py-4 border input-bordered rounded-xl shadow-2xl p-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Onsite</span>
                                    </label>
                                    <input type="radio" name="radio-orh" className="radio" value={`onsite`} defaultChecked={editedItem?.radioOrh} />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Remote</span>
                                    </label>
                                    <input type="radio" name="radio-orh" className="radio" value={`remote`} defaultChecked={editedItem?.radioOrh} />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Hybrid</span>
                                    </label>
                                    <input type="radio" name="radio-orh" className="radio" value={`hybrid`} defaultChecked={editedItem?.radioOrh} />
                                </div>
                            </div>

                            <label className="form-control shadow-2xl p-2 rounded-xl">
                                <div className="label">
                                    <span className="label-text">Category</span>
                                </div>
                                <select name='category' className="select select-bordered" defaultValue="default">
                                    <option disabled defaultValue={editedItem?.category}>Select one</option>
                                    {
                                        categories.map((category, index) => <option value={category.value} key={index}>{category.name}</option>)
                                    }
                                </select>
                            </label>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" id="email" className="input input-bordered" placeholder="example@mail.com" defaultValue={editedItem?.email} />
                            </div>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name="address" id="" className="input input-bordered" placeholder="road-name, road-name, road-type, city, state, country, zipcode/postcode" defaultValue={editedItem?.address} />
                            </div>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Last-Date</span>
                                </label>
                                <input type="date" name="lastDate" id="lastDate" className="input input-bordered" placeholder="" defaultValue={editedItem?.lastDate} />
                            </div>

                            <label className="form-control shadow-2xl w-full max-w-xs p-2 rounded-xl">
                                <div className="label">
                                    <span className="label-text">Image <p className='inline'>(up to 32mb)</p></span>
                                </div>
                                <input name='imagefile' type="file" className="file-input file-input-bordered w-full max-w-xs" />

                                <div className="label">
                                    <span className="label-text">Current Image:  <p className='inline'>{editedItem?.image.display_url}</p></span>
                                </div>
                                <img src={editedItem?.image?.display_url} alt="Job image" className="rounded-lg my-1" />
                            </label>

                            <div className="form-control shadow-2xl p-2 rounded-xl">
                                <label className="label">
                                    <span className="label-text">Resource Link</span>
                                </label>
                                <input type="url" name="resourceLink" className="input input-bordered" placeholder={`https://example.com`} defaultValue={editedItem?.resourceLink} />
                            </div>

                            <label className="form-control shadow-2xl p-2 rounded-xl">
                                <div className="label">
                                    <span className="label-text">Details <p className='inline'>(up to 150 alphabets)</p></span>
                                </div>
                                <textarea name='details' className="textarea textarea-bordered h-24" placeholder="Write details about the job..." defaultValue={editedItem?.details}></textarea>
                            </label>

                            <div className="form-control shadow-2xl">
                                <input className="btn btn-primary" type="submit" value="Save Item" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditItem;