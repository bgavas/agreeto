import { LoaderArguments } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getSession } from "~/sessions.server";
import { getEvents } from "~/utils/microsoft/calendar.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const queryToken = new URL(request.url).searchParams.get("token");
  const session = await getSession(request.headers.get("Cookie"));
  const token = queryToken || session.get('microsoft-token');

  // Redirect to login page if token not exists
  if (!token) {
    throw new Error('Token is required');
    // return redirect("/auth/microsoft?runtime=browser");
  }

  const events = await getEvents(token);

  return json(events.value);
}

// Disabled this UI since we want to return a json api data
// export default function Callback(): ReactElement {
//   const events = useLoaderData();

//   return (
//     <table style={{ borderSpacing: '20px' }}>
//       <thead>
//         <tr>
//           <th>Subject</th>
//           <th>Organizer</th>
//           <th>Start Date</th>
//           <th>End Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           events.map((event: any) =>
//             <tr key={event.id}>
//               <td>{event.subject}</td>
//               <td>{event.organizer.emailAddress.name}</td>
//               <td>{event.start?.dateTime}</td>
//               <td>{event.end?.dateTime}</td>
//             </tr>,
//           )
//         }
//       </tbody>
//     </table>
//   );
// }
