
import com.google.api.client.util.Key;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for creating new memtees. */
@WebServlet("/new-mentee")
public class NewMenteeServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String menteeName = Jsoup.clean(request.getParameter("name"), Whitelist.none());
    String menteeEmail = Jsoup.clean(request.getParameter("email"), Whitelist.none());
    String menteeUsername = Jsoup.clean(request.getParameter("username"), Whitelist.none());
    String menteeSchool = Jsoup.clean(request.getParameter("school"), Whitelist.none());
    String menteeClassStanding = Jsoup.clean(request.getParameter("year"), Whitelist.none());
    String menteeIntro = Jsoup.clean(request.getParameter("intro"), Whitelist.none());
    String menteeReason = Jsoup.clean(request.getParameter("reason"), Whitelist.none());
    String menteeDesiredSkills = Jsoup.clean(request.getParameter("skill-desire"), Whitelist.none());

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Mentee");

    FullEntity menteeEntity =Entity.newBuilder(keyFactory.newKey())
            .set("menteeName", menteeName)
            .set("menteeEmail", menteeEmail)
            .set("menteeUsername", menteeUsername)
            .set("menteeSchool", menteeSchool)
            .set("menteeClassStanding", menteeClassStanding)
            .set("menteeIntro", menteeIntro)
            .set("menteeReason", menteeReason)
            .set("menteeDesiredSkills", menteeDesiredSkills)
            .build();
    datastore.put(menteeEntity);
    response.sendRedirect("/matchingPage.html");
    
  }
}