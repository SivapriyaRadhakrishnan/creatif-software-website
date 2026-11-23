import Page from '../components/Page'
import Button from '../components/Button'
import SplitText from '../components/SplitText'

export default function NotFound() {
  return (
    <Page title="Page Not Found" description="The page you are looking for could not be found.">
      <section className="notfound">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container notfound__inner">
          <p className="notfound__code" data-anim="scale-in">
            404
          </p>
          <SplitText as="h1" className="h2" text="This page took a *wrong* turn." />
          <p className="lead" data-anim="fade-up">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <div className="btn-row" data-anim="fade-up">
            <Button to="/">Back to Home</Button>
            <Button to="/contact" variant="ghost" arrow={false}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Page>
  )
}
