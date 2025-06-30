import React, { useState } from 'react';

const Subscribe = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        designation: '',
        membershipType: '',
        interests: [],
        experience: '',
        notifications: {
            events: true,
            workshops: true,
            newsletters: true,
            awards: false
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(item => item !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleNotificationChange = (type) => {
        setFormData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            console.log('Form submitted:', formData);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="bg-white text-black font-sans min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                    <p className="text-gray-600 mb-6">You have successfully subscribed to IIChE Baroda Regional Centre updates.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white text-black font-sans min-h-screen">
            {/* Header Section */}
            <div className="bg-[#d9f0f6] py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl font-semibold text-center mb-4">
                        Subscribe to IIChE Updates
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        Stay connected with the latest events, workshops, and opportunities in chemical engineering.
                        Join our community of professionals and students.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="px-6">
                        <p className="text-gray-600 text-sm italic">
                            <span className="font-medium">Note:</span> Only first name, last name, and email are required.
                            Additional information helps us better serve our community and improve our offerings.
                        </p>
                    </div>

                    {/* Professional Information */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization/Institution
                                </label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Membership Type
                                </label>
                                <select
                                    name="membershipType"
                                    value={formData.membershipType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                >
                                    <option value="">Select membership type</option>
                                    <option value="student">Student</option>
                                    <option value="professional">Professional</option>
                                    <option value="academic">Academic</option>
                                    <option value="industry">Industry</option>
                                    <option value="none">Not a member</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400"
                                >
                                    <option value="">Select experience</option>
                                    <option value="0-2">0-2 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="6-10">6-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Areas of Interest */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Areas of Interest</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                'Process Safety',
                                'Green Chemistry',
                                'Process Control',
                                'Chemical Reactors',
                                'Separation Processes',
                                'Biochemical Engineering',
                                'Petroleum Processing',
                                'Pharmaceuticals',
                                'Environmental Engineering',
                                'Materials Science',
                                'Nanotechnology',
                                'Energy Systems'
                            ].map((interest) => (
                                <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.interests.includes(interest)}
                                        onChange={() => handleInterestChange(interest)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-0"
                                    />
                                    <span className="text-sm text-gray-700">{interest}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                            {Object.entries(formData.notifications).map(([key, value]) => (
                                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleNotificationChange(key)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-0"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">
                                        {key === 'newsletters' ? 'Newsletters & Updates' :
                                            key === 'events' ? 'Event Invitations' :
                                                key === 'workshops' ? 'Workshop Notifications' :
                                                    'Award & Recognition Updates'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Subscribing...
                                </span>
                            ) : (
                                'Subscribe to Updates'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Subscribe; 