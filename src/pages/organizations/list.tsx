import { type NextPage } from "next";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyOrganizationsPage: NextPage = () => {
    const router = useRouter();
    const { isLoaded, userId } = useAuth();
    const myOrganizations = api.organization.getUserOrganizations.useQuery();
    
    useEffect(() => {
        console.log(myOrganizations.data);
    }, [myOrganizations.data]);

    const handleClick = (organization: {
        id: string;
        ownerUserId: string;
        name: string;
        createdAt: Date;
    }) => {
        console.log(`Clicked on organization: ${JSON.stringify(organization)}`);
        // eslint-disable-next-line
        router.push(`/organizations/home/${organization.id}`);
    };

    if (!isLoaded || !userId) {
        return <p></p>
    } else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <div className="flex items-center justify-center bg-gray-200 p-4 rounded-md shadow-lg">
                    <table className="min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">My Organizations</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myOrganizations.data && myOrganizations.data.map((organization, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-blue-100 cursor-pointer"
                                    onClick={() => handleClick(organization.organization)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{organization.organization.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
};

export default MyOrganizationsPage;
