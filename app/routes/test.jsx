import CircularProgress from '@mui/joy/CircularProgress';

export default function TestComp() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className='flex flex-col items-center'>
                <CircularProgress size="lg" />
                <p>Generating results ...</p>
            </div>
        </div>
    );
}