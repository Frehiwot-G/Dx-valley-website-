document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
  try {
    const response_about = await fetch(
      "http://localhost:1338/api/about-us-page?populate[block][populate][image][fields][0]=url&populate[block][populate][image][fields][1]=alternativeText&populate[block][populate][about_us][populate][image][fields][0]=url&populate[block][populate][about_us][populate][image][fields][1]=alternativeText"
    );
    // const response = await fetch(
    //   "http://localhost:1338/api/landing-page?populate[block][populate][image][fields][0]=url&populate[block][populate][image][fields][1]=alternativeText&populate[block][populate][email]=true&populate[block][populate][phone]=true&populate[block][populate][address]=true&populate[block][populate][about_us][populate]=true"
    // );
    if (!response_about.ok) {
      throw new Error(
        "Network response was not ok " + response_about.statusText
      );
    }
    const data = await response_about.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayData(data) {
  if (
    !data ||
    !data.data ||
    !data.data.attributes ||
    !data.data.attributes.block
  ) {
    console.error("Invalid data structure:", data);
    return;
  }

  const aboutUstitle = document.getElementById("about-title");
  const aboutUsdescription = document.getElementById("about-desc");
  const aboutUsImage_1 = document.getElementById("about_image");

  console.log("title:", aboutUstitle);

  const about_data = data.data.attributes.block;

  // aboutUstitle.innerHTML = `${about_data.about_us.title}`;
  // aboutUsdescription.innerHTML = `${about_data.about_us.description}`;
  // aboutUsImage_1.innerHTML = `${about_data.about_us.image}`;

  // const blocks = data.data.attributes.block;
  // console.log('Blocks:', blocks);

  about_data.forEach((block) => {
    if (block.__component === "layout.about" && block.about_us) {
      aboutUstitle.innerHTML = `${block.about_us.title}`;
      aboutUsdescription.innerHTML = `${block.about_us.description}`;
      aboutUsImage_1.innerHTML = `${block.about_us.image}`;
    }
  });
}

// document.addEventListener("DOMContentLoaded", fetchData);
