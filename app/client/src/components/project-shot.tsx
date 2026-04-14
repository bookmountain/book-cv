import type { ProjectScreenshot } from "@/lib/site-content";

type ProjectShotProps = {
  screenshot: ProjectScreenshot;
};

export function ProjectShot({ screenshot }: ProjectShotProps) {
  return (
    <article className="shot-card">
      <div className="shot-frame">
        {screenshot.image_src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={screenshot.alt_text || screenshot.title} src={screenshot.image_src} />
        ) : (
          <div className="shot-placeholder">
            <span>Upload screenshot</span>
            <p>Add an image in Django admin for this project section.</p>
          </div>
        )}
      </div>
      <div className="shot-copy">
        <p className="mini-label">Screenshot</p>
        <h3>{screenshot.title}</h3>
        <p>{screenshot.introduction}</p>
      </div>
    </article>
  );
}
