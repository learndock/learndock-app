import { useState } from 'react';
import { HashLoader } from "react-spinners";
import { JsonViewer } from './JsonViewer';

export const NoConnectionBanner = () => {
  const [tried, setTried] = useState(false);
  const [json, setJson] = useState<any>();

  async function performPing() {
    try {
      if (tried) return;
      setTried(true);

      const response = await fetch("/api/system/ping");
      const errorInfo = {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        type: response.type,
        redirected: response.redirected,
        bodyUsed: response.bodyUsed,
        headers: Object.fromEntries(response.headers.entries()),
      };
      setJson(errorInfo);
    } catch (e) {
      setJson({ error: e instanceof Error ? e.message : String(e) });
    }
  }

  performPing();

  return (
    <div className="w-full flex justify-center pt-10 pb-6 bg-error dark:text-white text-black">
      <div className="flex flex-col items-center gap-6">
        <div className='flex flex-col items-center gap-8 font-bold text-5xl bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent'>
          <HashLoader size={80} color={'#22d3ee'} />
          <div className='flex flex-row justify-center items-center gap-6'>
            <span>No API Connection</span>
          </div>
        </div>
        <div>We could not establish a connection to the API. Maybe the server shut down and this page is just cached?</div>
        <div className='text-xl w-full' data-avoid>
          {json && <JsonViewer title="Response" data={json} />}
        </div>
      </div>
    </div>
  );
};

