import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Album} from "lucide-react";
import AddAlbumDialog from "./AddAlbumDialog";
import AlbumsTable from "./AlbumsTable";


const AlbumsTabContent = () => {
	return (
		<Card className="bg-zinc text-white border-none">
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<Album className='size-5 text-purple-500' />
							Albums Library
						</CardTitle>
						<CardDescription>Manage albums</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>
			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};
export default AlbumsTabContent;