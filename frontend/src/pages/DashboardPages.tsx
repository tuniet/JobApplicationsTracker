
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardPage from './Dashboard.tsx';
import ApplicationsPage from './Applications.tsx';
import CompaniesPage from './Companies.tsx';
import DocumentsPage from './Documents.tsx';
import InterviewsPage from './Interviews.tsx';
import SettingsPage from './Settings.tsx';
import './DashboardPages.css';

const DashboardPages = () => {
	const [selectedSection, setSelectedSection] = useState('Dashboard');
	return (
		<div className="dashboard-pages">
			<Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
			<div className="content">
				{selectedSection === 'Dashboard' && <DashboardPage />}
				{selectedSection === 'Applications' && <ApplicationsPage />}
				{selectedSection === 'Interviews' && <InterviewsPage />}
				{selectedSection === 'Companies' && <CompaniesPage />}
				{selectedSection === 'Documents' && <DocumentsPage />}
				{selectedSection === 'Settings' && <SettingsPage />}
				{/* Add more sections as needed */}
			</div>
		</div>
	);
};

export default DashboardPages;
