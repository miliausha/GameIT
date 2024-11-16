import { NextPage } from "next";
import StartGameButton from "@/components/StartGameButton"; 

const MainPage: NextPage = async () => {
    return (
        <div className='flex w-full h-full mx-10'>
            <div className='w-full flex justify-center items-center'>
                <StartGameButton />
            </div>
        </div>
    );
}

export default MainPage;