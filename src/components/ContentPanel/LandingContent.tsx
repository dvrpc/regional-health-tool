export default function LandingContent() {
  return (
    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">About the Regional Health Tool</h2>
      <p>
        The Regional Health Indicators tool brings together health and built
        environment data for the Greater Philadelphia region to support more
        informed planning and decision-making. Use this tool to better
        understand how local conditions are connected to community health and
        well-being. This data could support grant applications, inform project
        selection, and encourage planning that considers long-term health
        effects.
      </p>
      <p>
        For more information on methodology or citation, visit the{' '}
        <a
          href="https://drive.google.com/drive/folders/12hI9q0xajkiStAlhnsXtA3K2309x7lfO"
          target="_blank"
        >
          project folder.
        </a>
      </p>
      <h3 className="text-lg font-bold mt-6">How to use this tool</h3>
      <p>
        Start by selecting a tract on the map. Once you've selected a tract,
        scroll through the indicators that appear on the right and select one to
        change the map layer. Switch between comparing the tract to the region
        or its county by selecting the 'Region' or 'County' buttons in the
        'Compare to' section
      </p>
      <h3 className="text-lg font-bold mt-6">Contact</h3>
      <p>
        For more information, contact: Amy Verbofsky (averbofsky@dvrpc.org)
        Manager of Healthy and Resilient Communities
      </p>
    </div>
  );
}
