import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useImgUploader from "../../../../../hooks/useImgUploader";
import useIndustryCategories from "../../../../../hooks/useIndustryCategories";

const CreateItem = () => {

    const industryCategories = useIndustryCategories();
    const { imgUploader } = useImgUploader();
    const axiosPrivate = useAxiosPrivate();
    const [posts, setPosts] = useState([]);
    // console.log(categories);

    const handleAddPost = (event) => {
        event.preventDefault();
        // add new post
        return setPosts([...posts, {}]);
    };


    const handleDelPost = async (event, index) => {
        event.preventDefault();

        // ---###important###--- del functionality is not working. it does not delete the specific element.
        // const prePosts = [...posts];
        // prePosts.splice(index, 1);
        // // prePosts[index].vacancy = "deleted";
        // console.log('index: ', index, prePosts[index], prePosts);
        // return setPosts(prePosts);
    };

    const handleCreateItem = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const title = form.get(`title`);
        const institution_name = form.get(`institutionName`);
        // const institution_logo_file = form.get(`institutionLogofile`); // try later;
        const status = form.get(`institutionCategories`);
        const industrial_categories = form.get(`InstrialCategories`) === null ? `` : { name: form.get(`InstrialCategories`).split(`,`)[0], bangla_name: form.get(`InstrialCategories`).split(`,`)[1] };
        const work_from = form.get(`workFrom`)
        const working_period = form.get(`workingPeriod`);
        const email = form.get(`email`);
        const mobile_phone = form.get(`mobilePhone`)
        const address = form.get(`address`);
        const apply_start_date = form.get(`applyStartDate`);
        const apply_close_date = form.get(`applyCloseDate`);
        const apply_medium = form.get(`applyMedium`);
        const apply_link = form.get(`applyLink`);
        const source_web_link = form.get(`sourceWebLink`);
        const circular_image_file = form.get(`circularImageFile`);
        const description = form.get(`description`);

        posts.map((post, index) => {
            const prePosts = [...posts];
            // console.log("prePosts: ", prePosts);
            // console.log(`post: ${post.title}, index: ${index}`);
            // console.log("line: ", form.get(`post${index}Title`));

            prePosts[index].title = form.get(`post${index}Title`);
            prePosts[index].name = ``;
            prePosts[index].vacancy = form.get(`post${index}Vacancy`);
            prePosts[index].summary = form.get(`post${index}Summary`);
            prePosts[index].requirements = {
                gender: form.get(`post${index}Gender`),
                qualifications: {
                    graduations: form.get(`post${index}Education`),
                    experiences: form.get(`post${index}Experience`),
                    skills: form.get(`post${index}Skills`),
                    certificates: ``,
                },
            };
            prePosts[index].responsibilities = { task: ``, additional: `` };
            prePosts[index].working = {
                style: ``,
                period: form.get(`post${index}WorkingPeriod`),
                address: form.get(`post${index}Address`),
                location: ``,
            };
            prePosts[index].purpose = ``;
            prePosts[index].benefits = ``;
            prePosts[index].apply = {
                start_date: ``,
                close_date: ``,
                medium: ``,
                link: ``,
                fee: form.get(`post${index}ApplyFee`),
                guidelines: ``,
            };
            prePosts[index].sources = {
                link: ``,
                /*image: {
                    display_url,
                    img_url,
                    delete_rl,
                    thumb_url,
                }, */
            };
            prePosts[index].salary = form.get(`post${index}Salary`);
            prePosts[index].details = ``;
            prePosts[index].description = form.get(`post${index}Description`);
            // console.log(prePosts);

            setPosts(prePosts);
        });


        const circular = { // _id,
            title, // circular title,
            institution: {
                name: institution_name, // Bangladesh Bank
                logo: ``, // institution_logo will be implemented later, while including company DB.
                types: {
                    status, // govt , non-govt/ngo,
                    industrial_categories, // 
                },
            },
            working: {
                style: work_from, // onsite or remote or hybrid      
                period: working_period,
            },
            total_vacancy: posts.reduce((total, current) => total + parseInt(current?.vacancy), 0),
            contact: {
                number: {
                    land_phone: ``,
                    mobile_phone,
                    fax: ``,
                },
                online: {
                    email,
                    website: ``,
                    linked: ``,
                    x: ``,
                    facebook: ``,
                    youtube: ``,
                },
                address,
                location: ``,
            },
            apply: {
                start_date: apply_start_date,
                close_date: apply_close_date,
                medium: apply_medium,
                link: apply_link,
                total_fee: posts.reduce((total, current) => total + parseInt(current?.apply?.fee), 0),
            },
            sources: {
                link: source_web_link,
                /* image: {
                display_url,
                img_url,
                delete_rl,
                thumb_url,
            }, */
            },
            details: ``,
            description,
            posts,
            /* posts: [
                {
                    // post._id,
                    title,
                    vacancy,
                    requirements: {
                        gender: ``,
                        qualifications: {
                            graduation,
                            experience,
                            skills,
                            certificates: ``,
                        },
                    }, // objects  
                    address,
                    summary,
                    responsibilities: {
                        tasks,
                        additional,
                    },
                    working: {
                        style: ``, // onsite or remote or hybrid      
                        period: ``, // hours
                        from: ``, // onsite, remote, hybride
                        address: {
                            street_number: ``,
                            house_number: ``,
                            county: ``,
                            recipient_name: ``,
                            district: ``,
                            town: ``,
                            village: ``,
                            city: ``,
                            country: ``,
                            post_code: ``,
                            road_no: ``,
                        },
                        location: ``,
                    },
                    purpose,
                    apply: {
                        start_date: apply_start_date,
                        close_date: apply_close_date,
                        medium: apply_medium,
                        // link: apply_link,
                        link: apply_link, // apply link
                        total_fee: posts.reduce((total, current) => total + parseInt(current?.apply_fee), 0)
                    },
                    source: {
                        link: source_web_link, // source link
                        image: {
                            display_url,
                            img_url,
                            delete_rl,
                            thumb_url,
                        }, 
                    },
                    benefits,
                    salary,
                    details,
                    description,
                },
            ], */
        };
        console.log("circular: ", circular);

        // send image to img server.
        const circularImgUploadedRes = await imgUploader(circular_image_file);
        // const circularImgUploadedRes = { display_url: true }; //testing
        // console.log(circularImgUploadedRes);

        if (circularImgUploadedRes?.display_url) {
            // add the img url link in the circular object
            circular.sources.image = circularImgUploadedRes;
            // console.log(circular);

            // seve data in Database
            const serverRes = await axiosPrivate.post(`/v1/jobs/circulars/create-item`, circular);
            // console.log(serverRes);

            if (serverRes?.data?.insertedId) {
                // showing notification after successfully data inserted in DB.
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
                    footer: '<a href="#">Server or DataBase might get any issue, please try again.</a>',
                });

                return;
            };
        };
    };


    return (
        <div className="space-y-5 my-10">

            <h2 className='text-center bg-gradient-to-bl'> Create Job Circular Item...</h2>

            <div className=" bg-base-200 rounded-3xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleCreateItem} className="card-body space-y-5">

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="Circular title [year]" className="input input-bordered shadow-2xl rounded-2xl" />
                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Institution name</span>
                                </label>
                                <input type="text" name='institutionName' id='institutionName' placeholder="provabok" className="input input-bordered shadow-2xl rounded-2xl" />
                            </div>

                            {/* <label className="form-control w-full max-w-xs p-2 rounded-2xl">
                                <div className="label">
                                    <span className="label-text">Institution logo<p className='inline'>(up to 32mb)</p></span>
                                </div>
                                <input name='institutionLogofile' type="file" className="file-input file-input-bordered w-full max-w-xs shadow-2xl rounded-2xl" />
                            </label> */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Institution categories</span>
                                </label>

                                <div className="grid grid-cols-2 border input-bordered shadow-2xl p-4 rounded-2xl">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Government</span>
                                        </label>
                                        <input type="radio" name="institutionCategories" className="radio" value={`govt`} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">NGO</span>
                                        </label>
                                        <input type="radio" name="institutionCategories" className="radio" value={`non-govt`} />
                                    </div>
                                </div>
                            </div>

                            <label className="form-control ">
                                <div className="label">
                                    <span className="label-text">Industry Category</span>
                                </div>
                                <select name='InstrialCategories' className="select select-bordered" defaultValue="default">
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
                                        <input type="radio" name="workFrom" className="radio" value={`onsite`} />
                                    </div>

                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Remote</span>
                                        </label>
                                        <input type="radio" name="workFrom" className="radio" value={`remote`} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Hybrid</span>
                                        </label>
                                        <input type="radio" name="workFrom" className="radio" value={`hybrid`} />
                                    </div>
                                </div>
                            </div>

                            {/* total vacancy: auto */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" id="email" className="input input-bordered shadow-2xl rounded-2xl" placeholder="example@mail.com" />
                            </div>

                            {/* land-phone */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="tel" name="mobilePhone" id="mobilePhone" className="input input-bordered shadow-2xl rounded-2xl" placeholder="+(country-code)..." />
                            </div>

                            {/* fax */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name="address" id="address" className="input input-bordered shadow-2xl rounded-2xl" placeholder="road-name, road-name, road-type, city, state, country, zipcode/postcode" />
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
                                        <input type="radio" name="workingPeriod" className="radio" value={`full-time`} />
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
                                <input type="date" name="applyStartDate" id="applyStartDate" className="input input-bordered  shadow-2xl rounded-2xl" placeholder="" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply close date</span>
                                </label>
                                <input type="date" name="applyCloseDate" id="applyCloseDate" className="input input-bordered  shadow-2xl rounded-2xl" placeholder="" />
                            </div>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Circular image <p className='inline'>(up to 32mb)</p></span>
                                </div>
                                <input name='circularImageFile' id="circularImageFile" type="file" className="file-input file-input-bordered w-full max-w-xs rounded-2xl" />
                            </label>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Source Web Link</span>
                                </label>
                                <input type="url" name="sourceWebLink" id="sourceWebLink" className="input input-bordered shadow-2xl rounded-2xl" placeholder={`https://example.com`} />
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
                                        <input type="radio" name="applyMedium" className="radio" value={`online`} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Off-line</span>
                                        </label>
                                        <input type="radio" name="applyMedium" className="radio" value={`offline`} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Apply Link</span>
                                </label>
                                <input type="url" name="applyLink" id="applyLink" className="input input-bordered shadow-2xl rounded-2xl" placeholder={`https://example.com`} />
                            </div>

                            <label className="form-control ">
                                <div className="label">
                                    <span className="label-text">Description <p className='inline'>(recommended up to 150 alphabets)</p></span>
                                </div>
                                <textarea name='description' id="description" className="textarea textarea-bordered h-24 shadow-2xl  rounded-2xl" placeholder="Write details about the circular..." ></textarea>
                            </label>

                            {/* posts */}
                            <section className=" form-control ">
                                <label className="level">
                                    <span className="label">Posts                 </span>
                                </label>
                                <div className="border input-bordered rounded-2xl shadow-2xl p-5">
                                    {
                                        posts.map((post, index) => <div key={index}>

                                            <div className="label">
                                                <span className="label">Post({index + 1})</span>
                                                <button onClick={() => handleDelPost(event, index)} className="label-text-alt btn btn-error btn-outline shadow-2xl rounded-2xl">Del Post</button>
                                            </div>


                                            <div className="border input-bordered rounded-2xl shadow-2xl p-5">
                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Title`} id={`post${index}Title`} placeholder="Post title" className="input input-bordered shadow-2xl rounded-2xl" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Vacancy</span>
                                                    </label>
                                                    <input type="number" name={`post${index}Vacancy`} id={`post${index}Vacancy`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="0" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Address</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Address`} id={`post${index}Address`} placeholder="road-name, road-name, road-type, city, state, country, zipcode/postcode" className="input input-bordered shadow-2xl rounded-2xl" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Apply fee</span>
                                                    </label>
                                                    <input type="number" name={`post${index}ApplyFee`} id={`post${index}ApplyFee`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="0" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Gender</span>
                                                    </label>

                                                    <div className="grid grid-cols-2 px-3 py-4 border input-bordered rounded-2xl shadow-2xl p-2">
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Male</span>
                                                            </label>
                                                            <input type="radio" name={`post${index}Gender`} className="radio" value={`male`} />
                                                        </div>

                                                        <div className="form-control ">
                                                            <label className="label">
                                                                <span className="label-text">Female</span>
                                                            </label>
                                                            <input type="radio" name={`post${index}Gender`} className="radio" value={`female`} />
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Both</span>
                                                            </label>
                                                            <input type="radio" name={`post${index}Gender`} className="radio" value={`both`} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Graduation</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Education`} id={`post${index}Education`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Experience</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Experience`} id={`post${index}Experience`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Skills</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Skills`} id={`post${index}Skills`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Working period</span>
                                                    </label>
                                                    <input type="text" name={`post${index}WorkingPeriod`} id={`post${index}WorkingPeriod`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Salary (fixed or from-to)</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Salary`} id={`post${index}Salary`} placeholder="follow 100000 or 10000-15000" className="input input-bordered shadow-2xl rounded-2xl" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Summary</span>
                                                    </label>
                                                    <input type="text" name={`post${index}Summary`} id={`post${index}Summary`} className="input input-bordered shadow-2xl rounded-2xl" placeholder="" />
                                                </div>

                                                <div className="form-control ">
                                                    <label className="label">
                                                        <span className="label-text">Description</span>
                                                    </label>

                                                    <textarea name={`post${index}Description`} id={`post${index}Description`} className="textarea textarea-bordered h-24 shadow-2xl  rounded-2xl" placeholder="Write details about the circular..." ></textarea>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                    <button onClick={() => handleAddPost(event)} className="btn my-5 ">Add Post+</button>
                                </div>

                            </section>

                            <div className="form-control shadow-2xl">
                                <input className="btn btn-primary rounded-2xl" type="submit" value="Add Item" />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CreateItem;