import React, {useEffect, useState} from 'react';
import UserService from "../../services/UserService";
import { useLocation } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';




const UserForm = (user) =>{
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [country, setCountry] = ("");
    const [city, setCity] = ("");

    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        // getCountries();
        // getCities();
        const person = location.state?.user;
        if(person){
            assignPerson(person);
        }
    }, []);

    const assignPerson = (person) =>{
        setId(person?.id);
        setFirstName(person?.firstName);
        setLastName(person?.lastName);
        setEmail(person?.email);
        setPhone(person?.phone);
    } 

    const handleSubmit = async (event) =>{
        event.preventDefault();
        let result;
        try{
            if(id){
                result = await UserService.update({user: {id, firstName, lastName, email, phone}});
            }else{
                result = await UserService.create({user:{firstName, lastName, email, phone}});
            }
            toast.success(result?.data?.message);
            history.push({
                pathname: `/users`,
            });

        }catch(error){
            toast.error("Error saving person");
        }
    }

    const handleReset = () => {
        setId('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }

    const getCountries = async() => {
        try{
            let data = {
                tableName: "ref_country",
                value: "country_id",
                label: "country_name",
            }
            const countries = await UserService.loadRefernceTableInfo(data);
            setCountries(countries.data);
        }catch(err){
            console.log(err);
            toast.error("error fetching countries.");
        }
    }

    const getCities = async() => {
        try{
            let data = {
                tableName: "ref_city",
                value: "city_id",
                label: "city_name",
            }
            const cities = UserService.loadRefernceTableInfo(data);
            setCities(cities.data);
        }catch(error){
            toast.error("Error getting cities.")
        }
    }

    const handleCityChange = (event) =>{
        // implement handle city
        setCity(event.taget.value);
    }

    const handleCountryChange = (event) =>{
        // implement handle country
        setCity(event.target.value);
    }

    return(
        <div className='container w-75'>
            <h2>User Form</h2>
            <form>
                <div className="form-group row p-4">
                    <label htmlFor='name' className='col-sm-2 col-form-label'>First Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={firstName} type="text" id="name" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row p-4">
                    <label htmlFor='name' className='col-sm-2 col-form-label'>Last Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="text" value={lastName} id="name" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                    <div className="col-sm-10">
                        <input type="email" className='form-control' id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='phone' className='col-sm-2 col-form-label'>Phone</label>
                    <div className="col-sm-10">
                        <input className='form-control' type="text" id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='country' className='col-sm-2 col-form-label'>Country</label>
                    <div className="col-sm-10">
                        {/* <CustDropdown options={countries} onSelectedItem={handleCountryChange}/> */}
                    </div>
                </div>
                <div className='form-group row p-4'>
                    <label htmlFor='country' className='col-sm-2 col-form-label'>Cities</label>
                    <div className="col-sm-10">
                        {/* <CustDropdown options={city} onSelectedItem={handleCityChange}/> */}
                    </div>
                </div>
                <div className='form-group p-4 row justify-content-center'>
                    <div className='col-1'>
                        <button onClick={handleSubmit} className='btn btn-sm btn-primary'>Save</button>
                    </div>
                    <div className='col-1'>
                        <button className='btn btn-sm btn-secondary' onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    );
} 
export default UserForm;