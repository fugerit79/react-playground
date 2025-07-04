const fs = require('fs');
const React = require('react');
const {
  renderToStream,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} = require('@react-pdf/renderer');

// Stili
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
});

// Componente
const MyDocument = () =>
  React.createElement(
    Document,
    {
      title: 'Generated PDF',
      author: 'Matteo Franci',
      subject: 'Sample generated with React-PDF',
      keywords: 'react-pdf, example, react',
      creator: 'React PDF Generator',
      producer: 'react-pdf'
    },
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.title }, 'Generated PDF'),
        React.createElement(Text, null, 'Sample of react-pdf generated document.')
      )
    )
  );

// Generazione da stream
(async () => {
  const stream = await renderToStream(React.createElement(MyDocument));
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  fs.writeFileSync('output/read-pdf-sample.pdf', buffer);
  console.log('PDF salvato come output_stream.pdf');
})();
