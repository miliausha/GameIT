import { NextPage } from "next";
import Button from "@/components/Button"; 

const MainPage: NextPage = async () => {
    return (
        <div className='flex w-full h-full mx-10'>
            <div className='w-full flex justify-center items-center'>
                {/* <Button /> */}

                <Button>Travels</Button>
                
            </div>
        </div>
    );
}

export default MainPage;