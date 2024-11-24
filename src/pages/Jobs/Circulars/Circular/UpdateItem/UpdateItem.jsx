import { useParams } from "react-router-dom";
import useJobs from "../../../../../hooks/useJobs";
import useIndustryCategories from "../../../../../hooks/useIndustryCategories";
import useImgUploader from "../../../../../hooks/useImgUploader";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const UpdateItem = () => {

    const industryCategories = useIndustryCategories();
    const { id } = useParams();
    const { jobs, refetch } = useJobs();
    const editedItem = jobs.find(seletedjob => seletedjob._id === id);
    const { imgUploader } = useImgUploader();
    const axiosPrivate = useAxiosPrivate();
    console.log(id, editedItem);

    const handleAddPost = async (event) => {
        event.preventDefault();

        // editedItem.posts = [...editedItem.posts, {}];
        // console.log(editedItem.posts);
        return;
    };

    const handleDelPost = async (event, index) => {
        event.preventDefault();

        // ---###important###--- del functionality is not working. it does not delete the specific element.
        console.log('index: ', index,);
    };

    const updateDB = async (jobItem) => {
        delete jobItem._id;
        const serverRes = await axiosPrivate.patch(`/v1/jobs/circulars/update-item/${id}`, jobItem);
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

    const handleUpdateItem = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        editedItem.title = form.get(`title`);
        editedItem.institution_name = form.get(`institutionName`);
        // editedItem.institution_logo_file = form.get(`institutionLogofile`); // try later;
        editedItem.categories = form.get(`institutionCategories`);
        editedItem.industrial_categories = form.get(`InstrialCategories`) === null ? `` : { name: form.get(`InstrialCategories`).split(`,`)[0], bnagla_name: form.get(`InstrialCategories`).split(`,`)[1] };
        editedItem.work_from = form.get(`workFrom`)
        editedItem.email = form.get(`email`);
        editedItem.mobile_phone = form.get(`mobilePhone`)
        editedItem.address = form.get(`address`);
        editedItem.working_period = form.get(`workingPeriod`);
        editedItem.apply_start_date = form.get(`applyStartDate`);
        editedItem.apply_close_date = form.get(`applyCloseDate`);
        const circular_image_file = form.get(`circularImageFile`);
        editedItem.source_web_link = form.get(`sourceWebLink`);
        editedItem.apply_medium = form.get(`applyMedium`);
        editedItem.apply_link = form.get(`applyLink`);
        editedItem.description = form.get(`description`);


        editedItem?.posts.map((post, index) => {

            // console.log("form: ", form.get(`post${index}Description`));

            editedItem.posts[index].title = form.get(`post${index}Title`);
            editedItem.posts[index].vacancy = form.get(`post${index}Vacancy`);
            editedItem.posts[index].summary = form.get(`post${index}Summary`);
            editedItem.posts[index].requirements = ``;
            editedItem.posts[index].qualifications = {
                graduations: form.get(`post${index}Education`),
                experience: form.get(`post${index}Experience`),
                skills: form.get(`post${index}Skills`),
            };
            editedItem.posts[index].responsibilities = { task: ``, additional: `` };
            editedItem.posts[index].working_period = form.get(`post${index}WorkingPeriod`);
            editedItem.posts[index].purpose = ``;
            editedItem.posts[index].benefits = ``;
            editedItem.posts[index].address = form.get(`post${index}Address`);
            editedItem.posts[index].salary = form.get(`post${index}Salary`);
            editedItem.posts[index].apply_fee = form.get(`post${index}ApplyFee`);
            editedItem.posts[index].details = ``;
            editedItem.posts[index].description = form.get(`post${index}Description`);
            // console.log(editedItem.posts);
        });

        console.log(editedItem); // send to backend database server.

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
                if (circular_image_file?.size > 0) { // if user has changed image file

                    // send image to img server.
                    const imgUploadedRes = await imgUploader(circular_image_file);

                    if (imgUploadedRes?.display_url) {
                        // add the updated img url link in the jobItem object
                        editedItem.image = imgUploadedRes;
                    };

                    updateDB(editedItem);
                } else { // if user hasn't changed the image file.

                    // add the previous img url link in the jobItem object
                    // editedItem.image = editedItem.image;
                    console.log(editedItem);

                    updateDB(editedItem);
                };

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };


    return (
        <div className="space-y-5 my-10">

            <h2 className='text-center bg-gradient-to-bl'> Update Circular Item...</h2>

            <div className=" bg-base-200 rounded-3xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdateItem} className="card-body space-y-5">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="Circular title [year]" className="input input-bordered  shadow-2xl rounded-2xl" defaultValue={editedItem?.title} />
                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Institution name</span>
                                </label>
                                <input type="text" name='institutionName' id='institutionName' placeholder="provabok" className="input input-bordered shadow-2xl rounded-2xl" defaultValue={editedItem?.institution_name} />
                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Institution categories</span>
                                </label>

                                <div className="grid grid-cols-2 border input-bordered shadow-2xl p-4 rounded-2xl">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Government</span>
                                        </label>
                                        <input type="radio" name="institutionCategories" className="radio" value={`govt`} defaultChecked={editedItem?.institution?.institution_types?.categories} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">NGO</span>
                                        </label>
                                        <input type="radio" name="institutionCategories" className="radio" value={`non-govt`} defaultChecked={editedItem?.institution?.institution_types?.categories} />
                                    </div>
                                </div>
                            </div>

                            <label className="form-control ">
                                <div className="label">
                                    <span className="label-text">Industry Category</span>
                                </div>
                                <select name='InstrialCategories' className="select select-bordered" defaultValue={editedItem?.institution?.institution_types?.industryCategories}>
                                    <option disabled value="default" >Select one</option>
                                    {
                                        industryCategories.map((category, index) => <option value={[category.name, category.banglaName]} key={index}>{category.name} ({category.banglaName})</option>)
                                    }
                                </select>
                            </label>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Work from</span>
                                </label>

                                <div className="grid grid-cols-2 px-3 py-4 border input-bordered rounded-2xl shadow-2xl p-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Onsite</span>
                                        </label>
                                        <input type="radio" name="workFrom" className="radio" value={`onsite`}
                                            defaultChecked={editedItem?.institution?.institution_types?.work_form} />
                                    </div>

                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Remote</span>
                                        </label>
                                        <input type="radio" name="workFrom" className="radio" value={`remote`} defaultChecked={editedItem?.institution?.institution_types?.work_form} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Hybrid</span>
                                        </label>
                                        <input type="radio" name="workFrom" className="radio" value={`hybrid`} defaultChecked={editedItem?.institution?.institution_types?.work_form} />
                                    </div>
                                </div>
                            </div>

                            {/* total vacancy: auto */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" id="email" className="input input-bordered shadow-2xl rounded-2xl" placeholder="example@mail.com" defaultValue={editedItem?.contact?.email} />
                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="tel" name="mobilePhone" id="mobilePhone" className="input input-bordered shadow-2xl rounded-2xl" placeholder="+(country-code)..." defaultValue={editedItem?.contact?.number?.mobile_phone} />
                            </div>

                            {/* fax */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name="address" id="address" className="input input-bordered shadow-2xl rounded-2xl" placeholder="road-name, road-name, road-type, city, state, country, zipcode/postcode" defaultValue={editedItem?.contact?.address} />
                            </div>

                            {/* location */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Working period</span>
                                </label>
                                <div className="grid grid-cols-2 px-3 py-4 border input-bordered rounded-2xl shadow-2xl p-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full-time</span>
                                        </label>
                                        <input type="radio" name="workingPeriod" className="radio" value={`full-time`} defaultChecked={editedItem?.working_period} />
                                    </div><div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Part-time</span>
                                        </label>
                                        <input type="radio" name="workingPeriod" className="radio" value={`part-time`} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply start date</span>
                                </label>
                                <input type="date" name="applyStartDate" id="applyStartDate" className="input input-bordered  shadow-2xl rounded-2xl" placeholder="" defaultValue={editedItem?.apply?.start_date} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply close date</span>
                                </label>
                                <input type="date" name="applyCloseDate" id="applyCloseDate" className="input input-bordered  shadow-2xl rounded-2xl" placeholder="" defaultValue={editedItem?.apply?.close_date} />
                            </div>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Circular image <p className='inline'>(up to 32mb)</p></span>
                                </div>
                                <input name='circularImageFile' id="circularImageFile" type="file" className="file-input file-input-bordered w-full max-w-xs rounded-2xl" />

                                <div className="label">
                                    <span className="label-text">Current Image:  <p className='inline'>{editedItem?.image?.display_url}</p></span>
                                </div>
                                <img src={editedItem?.image?.display_url} alt="Job image" className="rounded-lg my-1" />
                            </label>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Source Web Link</span>
                                </label>
                                <input type="url" name="sourceWebLink" id="sourceWebLink" className="input input-bordered shadow-2xl rounded-2xl" placeholder={`https://example.com`} defaultValue={editedItem?.source_links?.website} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply medium</span>
                                </label>

                                <div className="grid grid-cols-2 border input-bordered shadow-2xl p-4 rounded-2xl">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">On-line</span>
                                        </label>
                                        <input type="radio" name="applyMedium" className="radio" value={`online`} defaultValue={editedItem?.apply?.medium} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Off-line</span>
                                        </label>
                                        <input type="radio" name="applyMedium" className="radio" value={`offline`} defaultValue={editedItem?.apply?.medium} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply Link</span>
                                </label>
                                <input type="url" name="applyLink" id="applyLink" className="input input-bordered shadow-2xl rounded-2xl" placeholder={`https://example.com`} defaultValue={editedItem?.apply?.link} />
                            </div>

                            <label className="form-control ">
                                <div className="label">
                                    <span className="label-text">Description <p className='inline'>(recommended up to 150 alphabets)</p></span>
                                </div>
                                <textarea name='description' id="description" className="textarea textarea-bordered h-24 shadow-2xl  rounded-2xl" placeholder="Write details about the circular..." defaultValue={editedItem?.description}></textarea>
                            </label>

                            <section className=" form-control ">
                                <label className="level">
                                    <span className="label">Posts                 </span>
                                </label>
                                <div className="border input-bordered rounded-2xl shadow-2xl p-5">
                                    {
                                        editedItem?.posts.map((post, index) => <div key={index}>

                                            <div className="label">
                                                <span className="label">Post({index + 1})</span>
                                                <button onClick={() => handleDelPost(event, index)} className="label-text-alt btn btn-error btn-outline shadow-2xl rounded-2xl">Del Post</button>
                                            </div>


                                            <div className="border input-bordered rounded-2xl shadow-2xl p-5">
                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Title`} id={`post${index}Title`} placeholder="Post title" className="input input-bordered shadow-2xl rounded-2xl" defaultValue={post?.title} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Vacancy</span>
                                                    </label>
                                                    <input type="number" name={`post${index}Vacancy`} id={`post${index}Vacancy`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="0" defaultValue={post?.vacancy} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Address</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Address`} id={`post${index}Address`} placeholder="road-name, road-name, road-type, city, state, country, zipcode/postcode" className="input input-bordered shadow-2xl rounded-2xl" defaultValue={post?.address} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Apply fee</span>
                                                    </label>
                                                    <input type="number" name={`post${index}ApplyFee`} id={`post${index}ApplyFee`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="0" defaultValue={post?.apply_fee} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Graduation</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Education`} id={`post${index}Education`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" defaultValue={post?.qualifications?.graduations} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Experience</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Experience`} id={`post${index}Experience`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" defaultValue={post?.qualifications?.experience} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Skills</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Skills`} id={`post${index}Skills`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" defaultValue={post?.qualifications?.skills} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Working period</span>
                                                    </label>
                                                    <input type="text" name={`post${index}WorkingPeriod`} id={`post${index}WorkingPeriod`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" defaultValue={post?.working_period} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Salary (fixed or from-to)</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Salary`} id={`post${index}Salary`} placeholder="follow 100000 or 10000-15000" className="input input-bordered shadow-2xl rounded-2xl" defaultValue={post?.salary} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Summary</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Summary`} id={`post${index}Summary`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" defaultValue={post?.summary} />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Description</span>
                                                    </label>

                                                    <textarea name={`post${index}Description`} id={`post${index}Description`} className="textarea textarea-bordered h-24 shadow-2xl  rounded-2xl" placeholder="Write details about the circular..." defaultValue={post?.description}  ></textarea>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                    <button onClick={() => handleAddPost(event)} className="btn my-5 ">Add Post+</button>
                                </div>

                            </section>

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

export default UpdateItem;