import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const id = "inject-comments";

const Comments = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id}>
      {mounted ? (
        <Giscus
          id={id}
          repo="kasin-it/my-website"
          repoId="R_kgDOLB0BAw"
          category="General"
          categoryId="DIC_kwDOLB0BA84CcRcs"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
          loading="lazy"
          theme={"dark_dimmed"}
        />
      ) : null}
    </div>
  );
};

export default Comments;
