import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.EntityQuery;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.ReadOption;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.StructuredQuery;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Key;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;


@WebServlet("/log-in")
public class LogInServlet extends HttpServlet {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.

        String inp_username = Jsoup.clean(request.getParameter("username"), Whitelist.none());
        
        QueryResults<Entity> results;
        
        //Check if it's a mentor
        Query<Entity> queryMentor = Query.newEntityQueryBuilder().setKind("Mentor")
            .setFilter(PropertyFilter.eq("mentorUsername", inp_username)).build();
        results = datastore.run(queryMentor);        
        
        String direction = "#";
        if (results != null){
            direction = inp_username;
        }
        else{
            //Check if it's a mentee
            Query<Entity> queryMentee = Query.newEntityQueryBuilder().setKind("Mentee")
                .setFilter(PropertyFilter.eq("menteeUsername", inp_username)).build();
            results = datastore.run(queryMentee);
            
            if (results != null){
                direction = inp_username;
            }
        }
        response.sendRedirect("/matchingPage.html?username="+direction);
    }
}