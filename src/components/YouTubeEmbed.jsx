const YouTubeEmbed = ({ videoId, title }) => (
  <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
    />
  </div>
);

export default YouTubeEmbed;
