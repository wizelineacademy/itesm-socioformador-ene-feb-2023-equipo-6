import CircularProgress from '@mui/joy/CircularProgress';

export default function GeneratingResults() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className='flex flex-col items-center'>
                <CircularProgress size="lg" />
                <p className='mt-4 font-bold text-gray-600'>Generating results ...</p>
            </div>
        </div>
    );
}