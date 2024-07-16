import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput'; // Import the newly created SelectInput component
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        descripion: '',
        location: '',
        domaines_id: '',
        site_web_url: '',
       
    });

    const [domainesOptions, setDomainesOptions] = useState([]);

    useEffect(() => {
        fetchDomainesOptions();
    }, []);

    const fetchDomainesOptions = async () => {
        try {
            const response = await fetch(route('domaines.index'));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDomainesOptions(data); // Assuming data is an array of { id, name }
        } catch (error) {
            console.error('Error fetching domaines:', error);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('company.register'), {
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className='authdesign'>
                    <h2>Sign up</h2>
                    <p>Stay updated on your professional world</p>

                    <div>
                        <TextInput
                            id="name"
                            name="name" placeholder="Companie Name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="email"
                            type="email" placeholder="E-mail"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="password"
                            type="password" placeholder="Password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="password_confirmation"
                            type="password" placeholder="Confirm Password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="descripion"
                            name="descripion" placeholder="descripion"
                            value={data.descripion}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('descripion', e.target.value)}
                            required
                        />
                        <InputError message={errors.descripion} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="location"
                            name="location" placeholder="Location"
                            value={data.location}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('location', e.target.value)}
                            required
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>


                    <div className="mt-4">
                        <TextInput
                            id="site_web_url"
                            type="url" placeholder="https://example.com"
                            name="site_web_url"
                            value={data.site_web_url}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('site_web_url', e.target.value)}
                            pattern="https://.*"
                            title="The site web URL must start with https://"
                            required
                        />
                        <InputError message={errors.site_web_url} className="mt-2" />
                    </div>

                   
                    <div className="mt-4">
                        <SelectInput
                            id="domaines_id"
                            name="domaines_id"
                            value={data.domaines_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('domaines_id', e.target.value)}
                            required
                        >
                            <option value="">Select Domain</option>
                            {domainesOptions.map((domain) => (
                                <option key={domain.id} value={domain.id}>
                                    {domain.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.domaines_id} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton className="custom-btn" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>

                    <div className='flex items-center justify-center mt-4'>
                        <p>
                            By clicking Continue, you agree to Easyinter’s <a href="">User agreement</a>, <a href="">Privacy Policy</a> and <a href="">Cookie Policy</a>
                        </p>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
