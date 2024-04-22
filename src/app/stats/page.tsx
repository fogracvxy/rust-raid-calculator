// import { scrapeData } from "../utils/scraper";

// export const generateStaticParams = async () => {
//   // If you don't need any dynamic params, you can remove this function
//   return [];
// };

// export const generateMetadata = () => {
//   // If you don't need any metadata, you can remove this function
//   return {};
// };

export default async function Page() {
  //   const tableData = await scrapeData();

  return (
    <div>
      <table>
        <thead>
          <tr>{/* Table header */}</tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
