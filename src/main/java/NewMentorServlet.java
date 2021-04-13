import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-mentor")
public class NewMentorServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String mentorName = Jsoup.clean(request.getParameter("name"), Whitelist.none());
    String mentorEmail = Jsoup.clean(request.getParameter("email"), Whitelist.none());
    String mentorUsername = Jsoup.clean(request.getParameter("username"), Whitelist.none());
    String mentorJob = Jsoup.clean(request.getParameter("role"), Whitelist.none());
    String mentorCollege = Jsoup.clean(request.getParameter("college"), Whitelist.none());
    String mentorIntro = Jsoup.clean(request.getParameter("intro"), Whitelist.none());
    String mentorExpertise = Jsoup.clean(request.getParameter("expert"), Whitelist.none());
    
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    response.sendRedirect("/matchingPage.html?username="+mentorUsername+"&type=mentor");

    Key mentorKey = datastore.newKeyFactory()
                    .setKind("Mentor")
                    .newKey(mentorUsername);
    Entity mentor = Entity.newBuilder(mentorKey)
            .set("mentorName", mentorName)
            .set("mentorEmail", mentorEmail)
            .set("mentorUsername", mentorUsername)
            .set("mentorJob", mentorJob)
            .set("mentorCollege", mentorCollege)
            .set("mentorIntro", mentorIntro)
            .set("mentorExpertise", mentorExpertise)
            .build();
    datastore.put(mentor);
  }
}